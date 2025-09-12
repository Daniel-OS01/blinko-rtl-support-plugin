BODY="Plugin repository: https://github.com/Daniel-OS01/blinko-rtl-support-plugin"

# Check if body contains repository URL
if [[ $BODY =~ https://github.com/[a-zA-Z0-9_-]+/[a-zA-Z0-9_-]+ ]]; then
  REPO_URL=${BASH_REMATCH[0]}
  REPO_NAME=$(echo $REPO_URL | awk -F'/' '{print $NF}')
  echo "repo_url=$REPO_URL" >> $GITHUB_OUTPUT
  echo "repo_name=$REPO_NAME" >> $GITHUB_OUTPUT
  
  # Add comment with instructions
  gh issue comment "23" --body "Thank you for your submission! 

I've detected the repository URL: $REPO_URL

A maintainer will review your submission and approve it by adding the 'approved' label.

Please ensure your repository:
- [ ] Has a valid plugin.json file in the main branch
- [ ] Follows the plugin development guidelines
- [ ] Has proper documentation"
else
  gh issue comment "23" --body "Error: Could not find a valid GitHub repository URL in your submission.

Please format your issue with:
- Title: [Plugin Submission] Your Plugin Name
- Body: Include your GitHub repository URL (e.g., https://github.com/username/repo)"
  exit 1
fi