const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec')

async function main() {
    try {
        const token = core.getInput("github_token", { required: true })
        const pr = core.getInput("pr", { required: true })
        const [owner, repo] = core.getInput("repo").split("/")

        const client = new github.GitHub(token)

        const pull = await client.pulls.get({
            owner: owner,
            repo: repo,
            pull_number: pr
        })

        const url = pull.data.head.repo.git_url
        const fork = pull.data.head.repo.fork
        const branch = pull.data.head.ref

        let remote = "origin"
        if (fork) {
            remote = url.replace("git://github.com", `https://${token}@github.com`)
        }

        exec.exec("git", ["fetch", remote, branch])
        exec.exec("git", ["config", `branch.${branch}.remote`, remote])
        exec.exec("git", ["config", `branch.${branch}.merge`, `refs/heads/${branch}`])
        exec.exec("git", ["checkout", branch])
    } catch (error) {
        core.setFailed(error.message)
    }
}

main()
