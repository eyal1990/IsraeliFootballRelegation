(function(){

    //var teamsName = ['Netania', 'Raanana', 'Sachnin', 'Hapoel'];

    //teamsName.forEach(function(teamName){
    //console.log('Start calculation for ' + teamName);


    var Team = require('./Team');
    var Game = require('./Game');
    var LeagueTable = require('./LeagueTable');

    //var teams = ['Netania', 'Raanana', 'Sachnin', 'Hapoel', 'Ashdod', 'Acre', 'Petah-Tikva', 'Haifa'];

    var gamesLeft = [];

    // Round 4
    gamesLeft.push(new Game('Netania', 'Sachnin'));
    //gamesLeft.push(new Game('Petah-Tikva', 'Acre'));
    gamesLeft.push(new Game('Ashdod', 'Haifa'));
    //gamesLeft.push(new Game('Raanana', 'Hapoel'));

    // Round 5
    gamesLeft.push(new Game('Haifa', 'Petah-Tikva'));
    gamesLeft.push(new Game('Hapoel', 'Netania'));
    gamesLeft.push(new Game('Sachnin', 'Ashdod'));
    gamesLeft.push(new Game('Acre', 'Raanana'));
    //
    //// Round 6
    gamesLeft.push(new Game('Netania', 'Acre'));
    gamesLeft.push(new Game('Ashdod', 'Petah-Tikva'));
    gamesLeft.push(new Game('Sachnin', 'Hapoel'));
    gamesLeft.push(new Game('Raanana', 'Haifa'));
    //
    //// Round 7
    gamesLeft.push(new Game('Haifa', 'Netania'));
    gamesLeft.push(new Game('Hapoel', 'Ashdod'));
    gamesLeft.push(new Game('Petah-Tikva', 'Raanana'));
    gamesLeft.push(new Game('Acre', 'Sachnin'));

    var leagueTable = new LeagueTable();
    leagueTable.addTeam(new Team('Netania', 40, 4));
    leagueTable.addTeam(new Team('Raanana', 41, 3));
    leagueTable.addTeam(new Team('Sachnin', 37, 4));
    leagueTable.addTeam(new Team('Hapoel', 35.5, 3));
    leagueTable.addTeam(new Team('Ashdod', 29, 4));
    leagueTable.addTeam(new Team('Acre', 29, 3));
    leagueTable.addTeam(new Team('Petah-Tikva', 26, 3));
    leagueTable.addTeam(new Team('Haifa', 26, 4));

    var possibleLeagueTables = [];
    var possibleRelegation = 0;

    var teamToCheck = 'Hapoel';

    //var Parallel = require('paralleljs');
    //var firstTime = true;
var rounds = 0;
    function runRemainingGames(games, leagueTable){

        rounds++;

        if (rounds % 10000 === 0)
            console.log(rounds);
        if (games.length === 0){
            if (leagueTable.isRelegated(teamToCheck)){
                //possibleLeagueTables.push(leagueTable);
                possibleRelegation++;
            }

            delete leagueTable;
            return;
        }

        if (!leagueTable.canBeRelegated(global && global.env && global.env.teamToCheck || teamToCheck)){
            return;
        }

        var clonedGames =JSON.parse(JSON.stringify(games));

        var game = clonedGames.pop();

        var saveResults = false;

        var homeClonedGame = JSON.parse(JSON.stringify(game));
        var leagueTableHome = leagueTable.clone();
        leagueTableHome.gameResult(homeClonedGame, '1', saveResults);

        //if (firstTime){
        //    firstTime = false;
        //    new Parallel(3, {env: {teamToCheck: teamToCheck}}).require(runRemainingGames).spawn(function(clonedGames, leagueTableHome){
        //        console.log(clonedGames, leagueTableHome);
        //        runRemainingGames(clonedGames, leagueTableHome);
        //
        //    });
        //}
        //else {
            runRemainingGames(clonedGames, leagueTableHome);
        //}

        var drawClonedGame = JSON.parse(JSON.stringify(game));
        var leagueTableDraw = leagueTable.clone();
        leagueTableDraw.gameResult(drawClonedGame, 'x', saveResults);
        runRemainingGames(clonedGames, leagueTableDraw);

        var awayClonedGame = JSON.parse(JSON.stringify(game));
        var leagueTableAway = leagueTable.clone();
        leagueTableAway.gameResult(awayClonedGame, '2', saveResults);
        runRemainingGames(clonedGames, leagueTableAway);
    }

    var startDate = new Date().getTime();

    runRemainingGames(gamesLeft, leagueTable);

    possibleLeagueTables.forEach(function(possibleTable, index){

        console.log(teamToCheck + ' Table #' + (index + 1));
        console.log('-------------------------------');

        console.log(possibleTable.toString());

        //console.log('\n')

    });

    console.log('#Possibilities of relegation for ' + teamToCheck + ': ' + possibleRelegation)

    console.log('Executed in ' + (new Date().getTime() - startDate) + ' milliseconds');

    //});

    })();