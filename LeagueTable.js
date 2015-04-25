function LeagueTable(){
    var teams = [];
    this.gamesPlayed = [];

    function compareTeams(team1, team2){

        if (team1.points > team2.points){
            return -1;
        }
        else if (team1.points < team2.points){
            return 1;
        }

        return 0;
    }

    function sortLeagueTable(){
        teams = teams.sort(compareTeams);
    }

    function getTeamPosition(teamName){
        sortLeagueTable();

        for(var i=0; i < teams.length; i++){
            if (teams[i].teamName === teamName){
                return i+1;
            }
        }

        throw new Error('Team ' + teamName + ' is missing from the league');
    }

    function getTeam(teamName){
        for(var i=0; i < teams.length; i++){
            if (teams[i].teamName === teamName) {
                return teams[i];
            }
        }
    }

    this.clone = function(){
        var clonedLeagueTable = new LeagueTable();

        clonedLeagueTable.addTeams(JSON.parse(JSON.stringify(teams)));
        clonedLeagueTable.gamesPlayed = JSON.parse(JSON.stringify(this.gamesPlayed))

        return clonedLeagueTable;
    }

    this.canBeRelegated = function(teamName){
        var team = getTeam(teamName);

        sortLeagueTable();
        if (teams[6].points + teams[6].gamesLeft * 3 < team.points &&
            teams[7].points + teams[7].gamesLeft * 3 < team.points){
            return false;
        }

        return true;
    }

    this.canBeSaved = function(teamName){
        var team = getTeam(teamName);
        sortLeagueTable();

        var teamPlace = 0;
        for (var i=0; i<teams.length; i++){
            if (teams[i].teamName === teamName){
                teamPlace = i+1;
            }
        }

        if (this.isRelegated(teamName) && (team.points + team.gamesLeft * 3) < teams[5]){
            return false;
        }

        return true;
    }

    this.isRelegated = function(teamName){

        var team = getTeam(teamName);

        return getTeamPosition(teamName) >= 7 || team.points === teams[6].points;
    }

    this.addTeam = function(team){
        teams.push(team);
    }

    this.addTeams = function(teams){
        for (var i=0; i < teams.length; i++){
            this.addTeam(teams[i]);
        }
    }

    this.gameResult = function(game, result, storeStatistics){

        game.result = result;

        if (storeStatistics){
            this.gamesPlayed.push(game);
        }

        var homeTeam = getTeam(game.homeTeam);
        var awayTeam = getTeam(game.awayTeam);

        if (result == '1'){
            homeTeam.points += 3;
        }
        else if (result == 'x'){
            homeTeam.points += 1;
            awayTeam.points += 1;

        }
        else{
            awayTeam.points += 3;
        }

        homeTeam.gamesLeft--;
        awayTeam.gamesLeft--;
    }

    this.toString = function(){
        var league = '';

        sortLeagueTable();

        teams.forEach(function(team, index){
           league += (index + 1) + '. ' + team.teamName;

            for (var i=0; i < 15 - team.teamName.length; i++){
                league += ' ';
            }

            league += team.points + '\n';
        });

        league += 'Games: \n';
        this.gamesPlayed.forEach(function(game, index){
            league += (16 - index) + '. ' + game.homeTeam + ' - ' + game.awayTeam + ' - ' + game.result + '\n';
        });

        return league;
    }
}

module.exports = LeagueTable;