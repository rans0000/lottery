function LotteryResult() {
    this.result = { entries: [], prizes: {} };
    this.prop = "";
    this.is4Lettered = false;
}
LotteryResult.prototype.get = function () {
    return this.result;
};

LotteryResult.prototype.identifyPrize = function (
    match,
    key,
    data,
    is4Lettered = false
) {
    if (data.includes(match)) {
        const tmp = data.match(/(\d{2,})\/-/);
        this.prop = key;
        this.is4Lettered = is4Lettered;
        this.result.prizes[key] = tmp[1];
    }
    return this;
};

LotteryResult.prototype.append = function (data) {
    if (!this.prop) return;

    const value = !this.is4Lettered
        ? data.match(/[A-Z]{2}\s[0-9]{6}/)
        : data.match(/^[0-9]{4}$/);
    if (value !== null) {
        this.result.entries.push({ ticketNo: value[0], prize: this.prop });
    }
};

LotteryResult.prototype.parseDate = function (data) {
    const date = data.match(/held on:.+(\d{2})\/(\d{2})\/(\d{4})/);
    if (date !== null) {
        this.result.date = `${date[3]}-${date[2]}-${date[1]}`;
    }
    return this;
};

LotteryResult.prototype.parseLotteryNo = function (data) {
    const lotteryNo = data.match(/(LOTTERY NO.)([A-Z]*-\d*)/);
    if (lotteryNo !== null) {
        this.result.lotteryNo = lotteryNo[2];
    }
    return this;
};

module.exports = LotteryResult;
