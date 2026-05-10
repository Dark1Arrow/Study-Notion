const convertSecondsToDuration = (totalSecond) => {
    const hour = Math.floor(totalSecond / 3600)
    const minute = Math.floor((totalSecond % 3600) / 60)
    const second = Math.floor((totalSecond % 3600) % 60)

    if(hour > 0){
        return `${hour}h ${minute}m`
    }else if(minute > 0){
        return `${minute}m ${second}s`
    }else{
        `${second}`
    }
}

export {convertSecondsToDuration}