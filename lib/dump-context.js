import core from '@actions/core';
import github from '@actions/github';

try {
    console.log(JSON.stringify(github.context, null, 2));
} catch (error) {
    core.setFailed(error.message);
}
