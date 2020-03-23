const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec')

async function main() {
    try {
        const token = core.getInput("token", { required: true })
        const pr = core.getInput("pr", { required: true })
        const [owner, repo] = core.getInput("repo", { required: true }).split("/")

        const client = new github.GitHub(token)

        const pull = await client.pulls.get({
            owner: owner,
            repo: repo,
            pull_number: pr
        })

        const fork = pull.data.head.repo.fork
        const remote = fork ? pull.data.head.repo.clone_url : "origin"
        const branch = pull.data.head.ref

        await exec.exec("git", ["fetch", remote, `${branch}:${branch}`])
        await exec.exec("git", ["config", `branch.${branch}.remote`, remote])
        await exec.exec("git", ["config", `branch.${branch}.merge`, `refs/heads/${branch}`])
        await exec.exec("git", ["checkout", branch])
    } catch (error) {
        core.setFailed(error.message)
    }
}

main()
