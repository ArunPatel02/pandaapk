const arrDiff = [
    {
        label: 's',
        value: 1000,
    },
    {
        label: 'm',
        value: 1000 * 60,
    },
    {
        label: 'h',
        value: 1000 * 60 * 60,
    },
    {
        label: 'd',
        value: 1000 * 60 * 60 * 24,
    },
    {
        label: 'y',
        value: 1000 * 60 * 60 * 24 * 365,
    },
];

function timeDifference(date) {
    let result: string = "";
    const value = Date.now() - date;
    for (let obj of arrDiff) {
        let temp = Math.round(value / obj.value);
        if (temp === 0) {
            break;
        } else
            result = `${temp}${obj.label}`
    }
    return result;
}

export default timeDifference