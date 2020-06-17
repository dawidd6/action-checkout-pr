# Checkout PR Github Action

An action that fetches and checks out a pull request branch leaving an ability to push made changes back to it, using provided token for the push.

It's basically `hub pr checkout` command, but as an Action.

This Action is meant to be used with `actions/checkout`.

## Usage

```yaml
- name: Checkout repo
  uses: actions/checkout@v2
  with:
    token: ${{secrets.TOKEN}}
- name: Checkout PR
  uses: dawidd6/action-checkout-pr@v1
  with:
    pr: 99
```
