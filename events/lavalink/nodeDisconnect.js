module.exports = async (client, node, reason) => {
    console.log(`Node ${node.options.identifier} has been disconnected, reason: ${reason}`);
}
