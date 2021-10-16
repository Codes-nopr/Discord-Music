module.exports = async (client, player, track, payload) => {
    let autoplay = await player.get('autoplay');

    if (autoplay === true) {
        let requester = await player.get('requester');
        await player.get('identifier');
        let identifier = await player.queue.current.identifier;
        let search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
        res = await player.search(search, requester);
        await player.queue.add(res.tracks[1]);
    }
}