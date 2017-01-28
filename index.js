/*!
 *
 * Copyright 2017 365admin.net IVS DK38266969 under the terms of the MIT
 * license found at http://github.com/365admin/q/raw/master/LICENSE
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
var _ = require('lodash');
var program = require('commander');
var pkg = require('./package.json');
var Crawler = require("./src/crawler");
var Backend = require("./src/backend");
var fs = require('fs');
var debug = require('debug');
var log = debug('app:log');
log.log = console.log.bind(console);
var error = debug('app:error');

function runPromise(p) {
    return p
        .then(function() {
            process.exit(0);
        }, function(err) {
            log('');
            if (program.debug || process.env.DEBUG) console.log(err.stack || '');
            process.exit(1);
        });
}

console.log(pkg.name);

program
    .option('-V, --version', 'Display running version', function() {
        log('CLI version: %s', pkg.version);
    });

program
    .command('crawl')
    .description('Crawl content sources')
    .action(function() {
        console.log("Crawling");
        var url = "https://fasttrack.microsoft.com/roadmap";

        runPromise(
            Crawler.getPage(url)
            .then(function(html) {
                var path = ".\\temp\\latest.html";
                fs.writeFileSync(path, JSON.stringify(html));
                log('Page crawled and stored in "%s"', path);
                process.exit(0);
            }, function(err) {
                error(err);

            })
        );
    });

program
    .command('parse')
    .description('Parse crawled content')
    .action(function() {
        console.log("Parsing");
        var pathHtml = ".\\temp\\latest.html";
        var pathJson = ".\\temp\\latest.json";
        var html = fs.readFileSync(pathHtml).toString();
        runPromise(
            Crawler.getRoadmap(html)
            .then(function(details) {
                fs.writeFileSync(pathJson, JSON.stringify(details));

                log('Page parsed and stored in "%s"', pathJson);
                process.exit(0);
            }, function(err) {
                error(err);
            })
        );
    });

program
    .command('run')
    .description('All actions')
    .action(function() {
        console.log("All actions");

        runPromise(
            Backend.updateCache("365roadmap", "123")
            .then(function() {

                log('Backend updated');
                process.exit(0);
            }, function(err) {
                error(err);
            })
        );
    });

if (_.isEmpty(program.parse(process.argv).args) && process.argv.length === 2) {
    program.help();
}