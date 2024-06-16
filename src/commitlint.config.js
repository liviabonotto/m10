module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', [
            'feat',  // Features
            'fix',   // Bug Fixes
            'docs'   // Documentation
        ]],
        'subject-case': [2, 'always', 'lower-case']
    }
};
