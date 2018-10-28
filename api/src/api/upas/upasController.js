const upasService = require('./upasService');

module.exports = {
    upaWeek,
    getDetails,
    upaForHour,
    getUpas,
    mediumTime,
    classification
};

async function getDetails(req){
    return await upasService.getDetails(req.params.upa);
};

async function upaForHour(req) {
    let response = await upasService.upaForHour(req.params.data);
    return response;
}

async function getUpas(){
    return await upasService.getUpas();
}

async function upaWeek(req) {
    let response = await upasService.upaWeek(req.params.upa, req.params.day);
    return response;
}

async function mediumTime(req){
    return await upasService.mediumTime(req.params.startDate, req.params.endDate);
}
async function classification(req) {
    let response = await upasService.classification(req.params.upa, req.params.dayStart, req.params.dayEnd);
    return response;
}
