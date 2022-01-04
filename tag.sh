#!/bin/bash
prompt_confirm_n() {
  while true; do
    read -r -n 1 -p "${1:-Continue?} (y/N): " REPLY
    case $REPLY in
      "") echo ; return 1 ;;
      [yY]) echo ; return 0 ;;
      [nN]) echo ; return 1 ;;
      *) printf " \033[31m %s \n\033[0m" "invalid input"
    esac
  done
}

GIT_LAST_TAG=$(git describe --tags --abbrev=0)
GIT_SHORT=$(git rev-parse --short HEAD)
GIT_COMMIT=$(git rev-parse HEAD)

echo "Last tag: $GIT_LAST_TAG";

if [[ -z "$1" ]]; then
  echo "Usage: $0 <semver>";
  exit 1;
fi

GIT_TAG="$1+$GIT_SHORT"

echo "Tagging commit $GIT_SHORT with $GIT_TAG";

prompt_confirm_n "Continue?" || exit 0

git tag "$GIT_TAG" "$GIT_COMMIT"
