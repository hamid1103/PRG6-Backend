import {Crop} from "../Schemas/Crop.js";
import mongoose from "mongoose";

//Hoeveel items laten zien? Geen limit/start -> currentitems = total
function currentItems(total, start, limit){
    let itemsLeft = Math.min(total - start, limit);
    if(!start||!limit)
    {
        return total
    }else {
        return itemsLeft
    }
}

function numberOfPages(total, start, limit){
    if (limit <= 0 || !limit || !start)
    {
        //geen limit = 1 item per pagina dan denk ik?
        return total
    }else {
        return Math.ceil((total - start) / limit)
    }
}

function currentPage(total, start, limit){
    if(!limit || !start){
        return 1;
    }else {
        return Math.floor((start/limit) + 1)
    }
}

function firstPageItem(start){
    return start ? 0 : start
}

function lastPageItem(total, start, limit){
    if (!start || !limit || limit <= 0){
        return total
    }else {
        return Math.min(total, start + limit * (Math.ceil(total/limit)-1))
    }
}

function previousPageItem(total, start, limit)
{
    return Math.max(0, start-limit)
}
function nextPageItem(total, start, limit){
    return start + limit;
}

function getFirstQueryString(total, start, limit)
{
    if(!start ||!limit){
        return ''
    }else{
        return `?start=1&limit=${limit}`
    }
}

function getLastQueryString(total, start, limit){
    if(!start || !limit ||limit <= 0 || start === total)
    {
        return 0
    }else{
        let lpi = lastPageItem(total,start,limit)
        return `?start=${lpi}&limit=${limit}`
    }
}

function getPreviousQueryString(total, start, limit){
    if(!start || !limit)
    {
        return ''
    }else {
        let lastpageitem = previousPageItem(total, start, limit)
        return `?start=${lastpageitem}&limit=${limit}`
    }
}

function getNextQueryString(total, start, limit){
    if(!start || !limit)
    {
        return ''
    }else {
        let npi = nextPageItem(total, start, limit)
        return `?start=${npi}&limit=${limit}`
    }
}

function itemToPageNumber(total, start, limit, itemNumber){
    if (!start || !limit || !itemNumber || limit <0)
    {
        return -1
    }
    return Math.floor((itemNumber - start)/limit)
}

function createPagination(total,start,limit) {
    return {
        currentPage: currentPage(total, start, limit),
        currentItems: currentItems(total, start, limit),
        totalPages: numberOfPages(total, start, limit),
        totalItems: total,
        firstPageItem: firstPageItem(start),
        lastPageItem: lastPageItem(total, start, limit),
        previousPageItem: previousPageItem(total, start, limit),
        nextPageItem: nextPageItem(total, start, limit),
        firstQueryString: getFirstQueryString(total, start, limit),
        lastQueryString: getLastQueryString(total, start, limit),
        previousQueryString: getPreviousQueryString(total, start, limit),
        nextQueryString: getNextQueryString(total, start, limit),
    }
}

const getCrops = async (req, res, next)=>{
    const acceptedType = req.accepts('json');

    if (!acceptedType) {
        res.status(406).json({ message: 'Not Acceptable' });
        return;
    }
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    const totalItems = await Crop.countDocuments({});
    const start = parseInt(req.query.start);
    const limit = parseInt(req.query.limit);
    const itemNumber = parseInt(req.query.item);

    const peg = createPagination(totalItems, start, limit)

    try{
        const crops = await Crop.find({}, 'name iconName').skip(start).limit(limit).exec()
        let items = crops.map((crop) => {
            const cropj = crop.toObject();
            return {
                ...cropj,
                _links: {
                    self: { href: `${req.protocol}://${req.get('host')}/crops/${crop.name}` }
                }
            };
        });
        res.json({
            items: items,
            "_links":{
                "self": {href: `${req.protocol}://${req.get('host')}/crops`}
            },
            "pagination": {
                currentPage: peg.currentPage,
                currentItems: peg.currentItems,
                totalPages: peg.totalPages,
                totalItems: peg.totalItems,
                _links: {
                    first: {
                        page: 1,
                        href: `${req.protocol}://${req.get('host')}/crops${peg.firstQueryString}`
                    },
                    last: {
                        page: peg.totalPages,
                        href: `${req.protocol}://${req.get('host')}/crops${peg.lastQueryString}`
                    },
                    previous: peg.previousQueryString !== '' ? {
                        page: peg.currentPage - 1,
                        href: `${req.protocol}://${req.get('host')}/crops${peg.previousQueryString}`
                    } : null,
                    next: peg.nextQueryString !== '' ? {
                        page: peg.currentPage + 1,
                        href: `${req.protocol}://${req.get('host')}/crops${peg.nextQueryString}`
                    } : null,
                    item: itemNumber ? {
                        page: itemToPageNumber(totalItems, start, limit, itemNumber),
                        href: `${req.protocol}://${req.get('host')}/crops?start=${start}&limit=${limit}&item=${itemNumber}`
                    } : null
                }
            }
        });
    } catch (err)
    {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const findCrops = async (req, res, next) =>{
    try {
        const crops = await Crop.find({name: "/"+req.params.name+"/i"}, 'name iconName').exec()
        res.json(crops)
    }catch (e)
    {
        next(e)
    }
}

const findCrop = async (req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    try {
        const crop = await Crop.findOne({name: req.params.name})
        if (!crop) {
            return res.status(404).json({ message: 'No crop goes by that name matey' });
        }
        let cropobj = crop.toObject()
        res.json({
            ...cropobj,
            _links: {
                self: {href: `${req.protocol}://${req.get('host')}/crops/${crop.name}`},
                collection: { href: `${req.protocol}://${req.get('host')}/crops` }
            }
        })
    }catch (e){
        next(e)
    }
}

export {getCrops, findCrops, findCrop}