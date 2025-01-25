```mermaid
flowchart TD
    A([Start])  --> B[Generate Random Number from 1-100]
    B --> Prompt[/Output Guess which number I'm thinking of between 1-100/]
    Prompt--> C[/Input number guess/]
    C --> D{Is User Input A Number?}
    D -->|Not A Valid Number| C
    D --> |Valid Number| If{Is Guess Within Boundaries?}
    If --> |Within Boundaries|E{Check Guess}
    If -->|Not Valid Guess| C
    E -->|Too Low| F[/Output Too Low, guess again/]
    F -->|Guess Again| C
    E -->|Too High| G[/Output Too High, guess again/]
    G -->|Guess Again| C
    E -->|Perfect| H[/Out Correct!/]
    H --> I([End])
```
# Flowchart Summary
Starts
Generates a random number 1-100
Prompts user to pick a number from 1-100
Checks to see if input is a number, if not, reprompts
Checks to see if input is a possible number, and doesnt go out of bounds, if not, reprompts
Checks guess against generated number
If higher or lower, outputs that the number is too low / too high and prompts them to guess again
If the correct number is guess, outputs that the answer is correct
Ends
