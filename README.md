# Checkout PR Github Action

An action that fetches and checkouts a pull request branch leaving an ability to push made changes back to it, using provided token for the push.

It's basically `hub pr checkout` command, but as an Action.

## Usage

```yaml
- name: Checkout repo
  uses: actions/checkout@v2
- name: Checkout PR
  uses: dawidd6/action-checkout-pr@master
  with:
    github_token: ${{secrets.GITHUB_TOKEN}}
    pr: 99
```
