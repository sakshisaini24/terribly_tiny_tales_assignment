# The assignment has been deployed on Netlify
# Follow the Link here: [https://teribblytinytales-sakshisaini.netlify.app/](https://teribblytinytales-sakshisaini.netlify.app/)
## What is TTT?

Terribly Tiny Tales tells great stories with top creators for the world's most ambitious brands.

## Problem Statement

Develop a frontend in Reactjs or Nextjs, which does the following:
1.On first load, only has a Submit button
2.On clicking on Submit, it will fetch the contents of https://www.terriblytinytales.com/test.txt
3.Parse the content and find the frequency of occurrence of each word (some words will occur only once, some twice and so on, and some will occur N times)
4.Then on the frontend, plot a histogram of the 20 most occurring words.
5.Also build an "Export" button, which when clicked will download a CSV file of the histogram data.
6.X-axis = top 20 words with highest occurrence Y-axis = how many times they occurred in the file

## Modules Used

Axios, Chart.js

### Step 1

Create a normal react app using npx create-react-app and go to the src folder wherein in App.js we will be doing all the modifications.

### Step 2

First to fetch the contents from [https://www.terriblytinytales.com/test.txt](https://www.terriblytinytales.com/test.txt), we will use the module called axios and store it in an object response and then we can use .trim() function to remove any trailing or ending white spaces and then .split() to split them into an array of substrings.

### Step 3

Firstly, create and empty object called wordCounts. Then initialize a for loop that iterates over each element in the words array using the :for...of" loop syntax. Inside the loop, check whether the current word is a key in the wordCounts object using the "in" operator. If the word already exists increment it's count otherwise put 1.

### Step 4

After the loop, create a new variable called "sortedWordCounts" using the "Object.entries()" method, which returns an array of key-value pairs from the "wordCounts" object. This array can then be sorted in descending order based on the count (the second element of each key-value pair) using the ".sort()" method and a comparison function that compares the second element of each array. Then the sorted array is sliced to the first 20 elements using the ".slice()" method.

The resulting "sortedWordCounts" array is then passed as an argument to the "setData()" function.

### Step 5

Now call a function "handleExport", this function exports data in CSV format.

1. It first maps the data array to a new array called "csvData", which contains each element of "data" as a comma-separated string using template literals.
2. It then creates a new Blob object using the "Blob" constructor, which takes "csvData" as its first argument and an object with a "type" property set to "text/csv;charset=utf-8;" as its second argument. A Blob represents raw data that can be stored in a file.
3. The "URL.createObjectURL()" method is then called with "blob" as its argument to create a URL for the Blob object.
4. A new "a" element is created using the "document.createElement()" method, and its "href" attribute is set to the URL created.
5. The "setAttribute()" method is then called on the "a" element to set its "download" attribute to "'word-frequency.csv'".
6. The "a" element is appended to the body of the HTML document using the appendChild() method. Then, "click()" method is called on the "a" element, which triggers the download of the CSV file.

### Step 6

Then we use the "useEffect" hook to create and destroy a bar chart using the Chart.js library.
The "useEffect" hook takes two arguments: a function and a dependency array. Then the function is executed when the component mounts or when the dependencies change. In this case, the function creates a new "Chart" object and renders it to a canvas element with the ID "chart". The chart is a bar chart that displays the frequency of words in the data passed to the component.

The "if (data)" then statement checks if there is data passed to the component. If there is no data, the function does not create a chart. If there is data, the function destroys any existing chart and creates a new one based on the data. The dependency array "data" specifies that the function should be executed whenever the "data" prop changes. This will ensure that the chart is updated whenever the data changes.

