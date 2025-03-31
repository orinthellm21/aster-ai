// const Configuration = {
//   extends: ['@commitlint/config-conventional'],
//   rules: {
//     'type-enum': [
//       2,
//       'always',
//       [
//         'feat', // New feature
//         'fix', // Bug fix
//         'improve', // Code improvement
//         'refactor', // Code refactoring
//         'docs', // Add documentation
//         'chore', // Minor change in development process
//         'style', // Style error fix, formatting, no logic impact
//         'test', // Write test
//         'revert', // Revert previous commit
//         'ci', // Change CI/CD configuration
//         'build', // Build files
//       ],
//     ],
//     'type-case': [2, 'always', 'lower-case'],
//     'type-empty': [2, 'never'],
//     'scope-empty': [2, 'never'],
//     'subject-empty': [2, 'never'],
//     'subject-full-stop': [2, 'never', '.'],
//     'header-max-length': [2, 'always', 72],
//   },
// };

// module.exports = Configuration;

module.exports = { extends: ['@commitlint/config-conventional'] };
