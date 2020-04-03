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

        console.log(pull)

        const fork = pull.data.head.repo.fork
        const modify = pull.data.maintainer_can_modify
        const remote = fork ? pull.data.head.repo.clone_url : "origin"
        const branch = pull.data.head.ref

        if (fork && !modify)
            core.warning("PR can't be modified by maintainer")

        await exec.exec("git", ["fetch", remote, `${branch}:${branch}`])
        await exec.exec("git", ["config", `branch.${branch}.remote`, remote])
        await exec.exec("git", ["config", `branch.${branch}.merge`, `refs/heads/${branch}`])
        await exec.exec("git", ["checkout", branch])
    } catch (error) {
        core.setFailed(error.message)
    }
}

main()
