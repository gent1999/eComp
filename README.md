# eComp
eComp is a Discord bot to facilitate organizing your own Esports league. Users can register their teams, build rosters, and then set up matchmaking for scrims and tourneys.  

# Features
• User registration and authentication
• Team registration and management
• Player roster management
• Matchmaking for scrims and tournaments
• Automated scorekeeping and match reporting

# Installation
• Clone the repository to your local machine
• Install dependencies with npm install
• Create a .env file with your Discord bot token (see .env.example for an example)
• Run the bot with npm start

# Usage
eComp can be used in any Discord server where it has been added as a member. To use the bot, users can interact with it using specific commands, such as:

&&start 
  `- initial command thats needs to be executed 
  - creates an "eComp Manager role", which gives the ability to run sensitive commands
  - if the role is deleted, the command needs to be executed again`
 
&&registerteam - (only users assigned with the "eComp Manager" role can run this)
               - prompts a message asking for the team name
               - adds a unique new team to the database
               - duplicates of the same team name will not work, and will prompt a message if done so
               - prompts a message asking to tag (@) the user to assign as the team captain
               - adds that user to join that team and labels them as the captain
&&addplayer - (only users assigned with the "eComp Manager" role can run this)
            - prompts a message asking for the team name to add a player to
            - prompts a message asking to tag (@) the user to add 
            - adds that user to join that existing team in the database
            - users can only be registered to one team
&&deleteteam - (only users assigned with the "eComp Manager" role can run this)
             - prompts a message asking for the team name
             - deletes that exisiting team from the database
&&league - display all registered team names and their win/loss records
&&team - prompts a message asking for the team name
       - displays team name, their win/loss record, and full team roster 
&&schedule - (only users assigned with the "eComp Manager" role can run this)
           - prompts a message asking for the event name
           - prompts a message asking for team 1 , then asks for team 2
           - prompts a message asking for which game
           - prompts a message for additional info/comments
           - sets up a match schedule
&&report - (only users assigned with the "eComp Manager" role can run this)
         - prompts a message asking for the event name
         - displays the teams involved, then asks who won this match
         - report match results in a log, then updates each teams win/loss record
For a full list of commands and usage instructions, see the bot's help menu (&&help).
