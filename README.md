# Checkout PR Github Action

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
