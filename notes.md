# Simple Timer App

I want to build a simple pomodoro-style timer to see if it can help with my coding (and work in general) productivity. This is meant to be super-simple and only use vanilla HTML, CSS, and JS.  

Here's what I have so far:  
- HTML strucure built
- simple CSS
- the start of the JavaScript code

What I need to do:  
- finish JS code
- simple testing for bugs

## Notes  

The start button should initiate a timer that counts down based on `userTimerLength`. Once the timer reaches 0:00, an alarm will sound for 3-5 seconds (I'll adjust the alarm duration as needed to see what works better). While the timer alarm is sounding, the `displayContainer` will flash Crimson `#DC143C`.  
At the end of the alarm duration, the break timer will initialize. When this timer hits 0:00 a different alarm will sound and the `displayContainer` will flash ForestGreen `#228B22`. Then the cycle will repeat (timer-alarm-break-alarm).  
The start button will start the timer. The stop button (perhaps it should be a "pause" button instead of stop) will pause the timer functionality. Clicking the start button after stop/pause will resume the timer.  
The reset button will rest the timer - but not start it - based on the values input by the user.  

### Functions

iniateAlarm(sound, bg color)  
this function will play a sound and change the background color of the div for a set amount of time.

startTimer()  

stopTimer()  

resetTimer()  
this will reset the timer based on user inputs.  


#### Stuarts' Questions  

- How will time remaining be represented?
    - total seconds remaining
    - minutes + seconds
- How to track whether timer is running? 
- How to track if in work session or break session?
- Where will interval ID live so it can be reliably stopped?

- What is the unit of truth?
    - will timer decrement once per second?
    - will display be derived from that value?
- What happens on each tick?
    - decrement remaining time
    - update the display
    - check for zero
    - transition state if needed
- How to prevent multiple timers from running at once?
    - what happens if start clicked twice?
    - what happens if start clicked after stop?

- Define start button behavior
- What conditions must be true for start-btn to do anything?
- What should btn do if:
    - timer is idle
    - timer is paused
    - timer is already running
- The start handler should:
    - validate state
    - initialize remaining time (if needed)
    - transition the app into a running state


