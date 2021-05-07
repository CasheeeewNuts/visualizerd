import {speedTest} from "./command/speed-test";


main()


function main() {
    speedTest()
        .then(stdout => JSON.parse(stdout))
        .then(result => {
            console.log(result)
        })
        .finally(() => {
            console.log('finished!')
        })
}