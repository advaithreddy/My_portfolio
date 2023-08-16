# Shell - A Linux Shell in C

___ 

The command implementations are as follows :

- `bg` : used to continue the execution of stopped background processes in the background environment.

- `baywatch` : used to execute the given commands from the list of options `newborn`,`dirty`,`interrupt` after a fixed interval as given input by the user, until <kbd>q</kbd> is pressed. Handles errors and invalid argument kind. enter `baywatch help` for correct `syntax` information.
  
- `cd` : To change the current working directory of the shell , it also supports multiple flags like : `-` , `.` , `~` , `..` etc. along with error messages.
  
- `echo` : To output the input string onto the terminal ,supports `redirection` and `piping`

- `fg` : To continue the execution of a stopped background process [ stored in the `jobs` list ] in the foreground.

- `history` : Implemented linked list kind structure to store the `20` latest commands entered in the shell . History remains saved across the sessions.
  
  `history` : displays latest entered 10 commands.

  `history <number>` :  displays the latest `number` history commands.

- `jobs` : A linked list data structure , implemented to keep a track of processes invoked in the background of the shell ( either by the user directly ( using the `&` flag)) or when a process running in foreground is stopped due to recieving of  `signal or interrupt` ( like <kbd>Ctrl + Z</kbd> or any other signal). 
  
  stores the process sorted lexographically in a linked list structure.

  `jobs` prints the [`job_number`] `process_status` `process_name` `pid` for processes stored in  the data structure. Enter `jobs help` for getting correct `syntax` and list of supported options.

  `[-options]` : `-r` and `-s` flags for specifically printing processes with status `Running` or `Stopped` respectively.

- `ls` : executes the listing command like normal shell , along with proper handling of flags `[-al]` in any order and any number of times. 

   supports multiple files and directories , and `flags` in any order.

   Implemented colors for different kind of files - `directory`,`files`,`executable` etc. to make them visually distinguishable.

- `pinfo` : outputs the status information of the processes.

  `pinfo` : displays the process information for the shell .

  `pinfo <proc_pid>` : displays the process information for the process with given pid and displays appropriate error messages, in case of failures or wrong input format.

- `pwd` : outputs the present working directory , handles errors.
  
- `replay` : executes the given command after fixed `interval` for a given `period` of time. Enter `replay help` for more command `syntax` information.
  
  `Usage :`

  `replay -command <command> -interval <interval> -period <period>` , that makes the command provided by the command flag , to replay itself ( or execute ) at fixed intervals provided by interval flag `<interval>` for a given `<period>`.

  - Handles errors in case of wrong syntax or missing arguments.
  - Flags can be used in any order 
  - Multiple flags of same kind , not allowed ; considered as wrong syntax and an error message is displayed.
  
- `repeat` :
   
   `Usage:`

   `repeat <number_of_repetitions> <command>` : repeats the command given , `<number_of_repetitions>` times. 

   - Handles errors , in case of wrong syntax or incorrect arguments provided.
  
-  `sig` : used to communicate with processes running in background of the shell ( stored in `jobs` data structure) by sending them signals to processes indicated by their job numbers . 
   
   `sig <job_num> <sig_num>` : sends the signal indicated by `<sig_num>` to the process indicated by `<job_num>`, handles errors in case of wrong syntax or failure in sending the signals.
  
-   other `shell commands` : runs the other shell commands by creating a child process using forking , and executes the commands provided using `execvp` sys call , displays apt error message in case of any failure. 


>The above implemented commands commands have been organised several headers and implementation files as described by their file_name.

1. `main.c`

   - Initializes the `shell` variables.
   - Contains the main shell loop.
  
2. `bg.c`

   - Implements the `bg` command
   - handles error in case of an invalid `job_number` is given or invalid syntax is used.
   - continues execution of a stopped background process in background by using.
  
3. `cd.c`

   - Implements the `cd` function in the shell using syscalls of chdir , throws apt error msgs in case of any error.
   - Changes directory to the directory given in input, gives an error if an invalid directory is given.
   
4. `echo.c`

   - Implements the standard `echo` command for the shell, takes into account of multiple spaces and tabs in the given argument.
   - Doesn't account for quotes currently.
 
5. `execute.c`

   - contains the main code for parsing the given input command string along with the apt arguments , into it's arguments 
   - calls the apt execute_command function from amongst the various functions implemented using `if` & `else` and other `string compare` functions.
   - handles `repeat` command.
   - **contains code for repeat implemented in it, handles nested repeats as well :)**
  
6. `header.h`

   - Includes all the standard C-libraries used all throughout implementing the C-Shell.
   - defined useful `macros` used all across the shell.

7. `fg.c`
   
   - Implements the `fg` command 
   - Does error handling and handles permissions and other signal .
   
8. `history.c`

   - Implements the functionality of storing the 20 most recent commands as an array implemented structure.
   - Provides functionality like printing the entire history or printing **n** most recent commands as specified by the user
   - Error handling for invalid argument.
   - Provides functionality to store the history of the session into a file ( a .txt file) , and init history function that saves the history of commands across the sessions of the shell.
   - Provides method to store back history into file ( saving the history upon exiting the current shell session )

9.  `input.c`

       - contains implemented getInput command that gets the user entered command and returns the char* string it reads from the terminal.
       - <kbd>Ctrl + D</kbd> - exits the shell .

10. `ls.c`
    
      - Handles the shell command `ls` with flags `-[al]` , can be  given in any order.
      - Handles error , and input in any given order.
  
11. `jobs.c`
    
      - Implements the jobs command , and associated utility functions for implementing the job data structure , updating it , etc .
     
12.  `pinfo.c`

       - implements the `pinfo` command .
  
13. `prompt.c`

       - ​Implements the shell prompt as `<USERNAME@HOSTNAME : curr_dir >`
  
14. `pwd.c`

      - implements the shell `pwd` command, prints to the teminal the current working directory , or displays apt error in case it fails to do so.

15. `pipe.c`
    
      - Implements the `piping` for shell.
  
16. `redirection.c`
      
      - Implements the `redirection` commands.
  
17. `replay.c`
    
      - Implements the `replay` command.
  
18. `signals.c`

   - `SIGINT_HANDLER` : <kbd> ctrl + C </kbd> , terminates the foreground process , does nothing for shell.
  
   - `SIGCHLD_HANDLER` : Implements the apt message of the process ( with process name and pid ) on terminal once a background process ( a child process of the terminal ) stops it's execution or finishes or is stopped by a signal, also updates the `jobs` data structure in case child process terminates it's execution or is killed ( `normally` or `abnormally` or `on recieving a signal` ).
  
   - `SIGTSTP_HANDLER` : <kbd>ctrl + Z </kbd> , stops the foreground process and pushes it to stop state in background ( gets stored in the `jobs` data structure ). Does nothing for the shell ( doesn't ) exits it.
  
   - implements the `sig` command .
  

19. `system_command.c`

    - contains code for implementing the system commands ( that arent implemented by me ) , using fork and execvp functionality.
    - throws apt error in case of failures 
    - executes system commands in **background** or in **foreground** as specified by the user.

20. `tokenize.c`

    - contains basic code for tokenizing the commands taken from user into the constituent commands 
    - handles extra spaces and tabs and ";"
    - returns the list of commands (char ** ) from the given input command string ( char *)
 
21. `helper.c`

    - Contains helper, sub-routine functions for other files , such as a function that returns the path relative to the home_dir ( our pseudo home dir).
    
___
