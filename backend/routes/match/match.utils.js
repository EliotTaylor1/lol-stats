export function assignPositionId(position) {
    switch (position) {
        case 'TOP':
            return 1
        case 'JUNGLE':
            return 2
        case 'MIDDLE':
            return 3
        case 'BOTTOM':
            return 4
        case 'UTILITY':
            return 5
        default:
            throw new Error(`Unrecognized position ${position}`)
    }
}

export function setWinningTeam(match) {
        const firstParticipant = match.participants[0]
        if (firstParticipant.win === true && firstParticipant.team_id === 100) {
            return "Blue"
        } else if (firstParticipant.win === false && firstParticipant.team_id === 100) {
            return "Red"
        } else if (firstParticipant.win === true && firstParticipant.team_id === 200) {
            return "Red"
        } else if (firstParticipant.win === false && firstParticipant.team_id === 200) {
            return "Blue"
        } else {
            throw new Error("No winner")
        }
}