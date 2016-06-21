var router = require('express').Router({ mergeParams: true });
var fs = require('fs');
module.exports = router;

router.get('/', function(req, res) {
    var obj;
    var rightnow = new Date();
    res.type('text/xml');

    fs.readFile('public/write/number.json', 'utf8', function(err, data) {
        if (err) throw err;
      //  console.log(data);
        obj = JSON.parse(data);

        if (rightnow.getTime() > (obj.time + 10000)) {
            var newnumber = obj.number + 1;
            fs.writeFile("public/write/number.json", "{\"number\": " + newnumber + ", \"time\": " + rightnow.getTime() + "}", function(err) {
                if (err) {
                    return console.log(err);
                }

                //  console.log("The file was saved!");
            });
            return res.status(200).send("<number>" + obj.number + "</number>");
        } else {
            var remainingTime = -1 * (Math.ceil((rightnow.getTime() - (obj.time + 10000)) / 1000));
            //    console.log("too fast! wait " + remainingTime + " more seconds");
            return res.status(200).send("<number>" + (obj.number - 1) + "</number>");

        }

    });

});