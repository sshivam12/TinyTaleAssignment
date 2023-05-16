Libraries and plugins:
React
Axios
React Chart.js 2
React CSV



Components:
App - The main component of the app. It contains the button to fetch the data, the chart, and the link to export the data to a CSV file.
fetchData - An asynchronous function that fetches the data from the server.
exportToCSV - A function that exports the data to a CSV file.


Explanation:
The App component uses the useState hook to store the data and the useEffect hook to fetch the data when the component mounts.
The fetchData function uses the axios library to fetch the data from the server.
The exportToCSV function uses the react-csv library to export the data to a CSV file.
The chart is created using the react-chartjs-2 library.

