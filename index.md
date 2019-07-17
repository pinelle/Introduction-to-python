## Introduction to Python Assignments

These assignments are included in my Introduction to Python workshop.


## Assignment 1
Learn how to use the Spyder IDE. Follow these steps:
- Start Spyder
- Work with default initial file
- Create a very simple program: print(“hello”)
- Save the .py file
- Run the program
- Verify the output 


## Assignment 2
Create a program that prompts the user for a numeric test grade 
The numeric grade should be used to determine if a student has earned an A, B, C, D or F in the class, using the rules on this table :

![useful image](https://user-images.githubusercontent.com/52934249/61403530-b5c83800-a892-11e9-9e7f-b94c8b941aa4.png)


Use a print() statement to output the letter grade.


Sample code to get you started:

```markdown
score = input(“What is your exam score? ")
score = float(score)
if (score >=90) :
	…
```
## Assignment 3
Write a function that calculates whether or not a given year is a leap year and has 366 days instead of 365.

Use this algorithm:
- A year will be a leap year if it is divisible by 4 but not by 100. 
- If a year is divisible by 4 and by 100, it is not a leap year unless it is also divisible by 400
- 1996, 1992, 1988 are leap years because they are divisible by 4 but not by 100

The function should print :"The year XXXX is a leap year." or "The year XXXX is NOT a leap year."
It should accept one argument: a non-negative number representing a year to evaluate

Sample code to get you started:

```markdown
def  leapYear (year):
	isLeapYear = false
	#determine if this is a leap year
	print(..)
  
leapYear(1996)
leapYear(2000)
leapYear(2002)
```

