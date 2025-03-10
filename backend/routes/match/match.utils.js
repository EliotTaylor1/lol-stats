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