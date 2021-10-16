module.exports = async (client, node, error) => {
    console.log(`Node ${node.options.identifier} encounter an error, ${error.message}`);
}