export function convertQueueIdToQueueName(queueId) {
    switch(queueId)
    {
        case 0:
            return "Custom"
        case 400:
            return "Summoners Rift: Normal Draft"
        case 420:
            return "Summoners Rift: Solo Queue"
        case 430:
            return "Summoners Rift: Normal Blind Pick"
        case 440:
            return "Summoners Rift: Flex Queue"
        case 450:
            return "Howling Abyss: ARAM"
        case 490:
            return "Summoners Rift: Normal Quickplay"
        case 700:
            return "Summoners Rift: Clash"
        case 720:
            return "Howling Abyss: ARAM Clash"
        case 900:
            return "Summoners Rift: ARURF"
        default:
            return "Unknown queue"
    }
}