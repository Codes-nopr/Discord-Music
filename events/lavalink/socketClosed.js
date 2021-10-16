module.exports = async (client, player, payload) => {
    if (payload.byRemote === true) {
        try {
            await player.destroy();
        } catch {
            
        }
    }
}