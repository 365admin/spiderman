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
var pkg = require('../package.json');
var Crawler = require("./crawler");
var Backend = require("./backend");
var fs = require('fs');
var debug = require('debug');
var log = debug('app:log');
var path = require('path');

log.log = console.log.bind(console);
var error = debug('app:error');

function runPromise(p) {
    return p
        .then(function() {
            //process.exit(0);
        }, function(err) {
            log('');
            if (program.debug || process.env.DEBUG) console.log(err.stack || '');
            process.exit(1);
        });
}

console.log(pkg.name);

program
    .option('-V, --version', 'Display running version', function() {
        console.log('CLI version: %s', pkg.version);
    });

program
    .command('crawl')
    .description('Crawl content sources')
    .action(function() {
        log("Crawling");
        var url = "https://fasttrack.microsoft.com/roadmap";

        runPromise(
            Crawler.getPage(url)
            .then(function(html) {
                    var filePath = path.resolve(__dirname, "..\\temp\\latest.html");
                    fs.writeFileSync(filePath, html);
                    log('Page crawled and stored in "%s"', filePath);
                    process.exit(0);
                },
                function(err) {
                    error(err);

                }));
    });

program
    .command('parse')
    .description('Parse crawled content')
    .action(function() {
        log("Parsing");
        var pathHtml = path.resolve(__dirname, "..\\temp\\latest.html");
        var pathJson = path.resolve(__dirname, "..\\temp\\latest.json");

        var html = fs.readFileSync(pathHtml).toString();
        runPromise(
            Crawler.getRoadmap(html)
            .then(function(details) {
                fs.writeFileSync(pathJson, JSON.stringify(details));
                log('Page parsed and stored in "%s"', pathJson);
                Backend
                    .updateCache("365roadmap", JSON.stringify(details))
                    .then(function(status) {
                            log(status);
                            //process.exit(0);
                        },
                        function(err) {
                            error(err);
                            //process.exit(0);
                        });

            }, function(err) {
                error(err);
            })
        );
    });

program
    .command('sync')
    .description('Syncronize changes with backend')
    .action(function() {
        log("Syncronizing");

        runPromise(
            Backend.readCache("365roadmap")
            .then(function(cache) {
                log('Backend read')

                if (cache) {
                    log("Found cached data");
                    if (cache.featureItems) {
                        log("Contains %s", cache.featureItems.length);
                    }
                } else {
                    log("Found NO cached data");

                }
                process.exit(0);
            }, function(err) {
                error(err);
            })
        );
    });

if (_.isEmpty(program.parse(process.argv).args) && process.argv.length === 2) {
    program.help();
}