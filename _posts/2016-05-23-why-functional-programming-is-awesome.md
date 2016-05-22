---
layout: post
title:  "Why Functional Programming Is Awesome"
date:   2016-05-23 14:26:24 +0100
categories: functional programming javascript
description: "Learn the fundamentals of functional programming with javascript"
image: "images/why-functional-programming-is-awesome/title.jpg"
---


Like many of you, I've only really heard of functional programming over the last number of months.
Initially I looked at some functional examples and thought:

#### "This is seriously f**ked up..."

Then I read some articles on how writing you code more "functionally" and it made sense to me. For example, writing "pure" functions that don't have any side effects means you don't have to worry about functions returning the wrong value if they're called twice. And writing functions that all return values, means you can chain them together, making your program both more concise and expressive.

A lot of languages seem to be embracing the functional paradigm like Java and Javascript. For example in 2015 making variables read only was implemented in Javascript, which is a big part of the functional paradigm.  Furthermore functional languages like Scala are increasingly being used in industry. So at the very least it's a good idea to have a basic idea of functional programming.

This post will explain some of the ways you can write your code more "functionally" with code snippets in Javascript.

**Please note that this post focuses more on the list comprehension side of functional programming**

Before we continue any further I want to lay some ground rules that I personally found useful for writing my code more functionally.

- Write a functions that do one simple thing
- Have each function return values and take a parameters.
- Treat variables as immutable values
- Forget about `for(var i = 0;i<...)` loops, use `forEach` and the various functions built on top it

Functional programming requires you to write "pure" functions which basically means no matter how many times you call it, provided the parameters don't change, it will return the same value. The classic example is this:

{% highlight javascript %}
//Pure
function add(x,y){
  return x+y;
}
//Impure
var x = 0;
function add(y){
  return x+y;
}
{% endhighlight %}

If we the impure add several times multiple times we get a different answer each time. When dealing with complex programs or programs with multiple threads, it's comforting to know that if a function is called multiple times it will always return the same answer.

In this example we're going to take some weather data from <a href="http://openweathermap.org/">openweathermap</a> and make a new object like so:
{% highlight javascript %}
{
  averageTemp:Number,
  averageRainFall:Number,
  minMaxTemp:[[Number,Number]]
}
{% endhighlight %}

 The data below is the 7 day forecast for the city of London. We're going to start with something basic like calculating the average temperature of the 16 day period. The sample data can be found <a href="{{ "/post_resources/weather.json" | prepend: site.baseurl }}">here</a>.

#### Get the average temperature
Right, the first thing we want todo is loop through the list of days and extract the temperatures for each day and store them in a new array. We could do it this way:

{% highlight javascript %}
var temperatures = [];
for (var i = 0; i < data.list.length; i++) {
 temperatures.push(data.list[i].temp.day);
}
#=>  [10.63, 14.1, 17.64, 11.68, 16.42, 17.19, 16.87 ]
{% endhighlight %}

This is the easiest way to get the values, but it quite frankly sucks. We could write the same code as follows:

{% highlight javascript %}
const temperatures = data.list.map((day)=>{return day.temp.day;});
#=> [10.63, 14.1, 17.64, 11.68, 16.42, 17.19, 16.87 ]
{% endhighlight %}

We managed to reduce 4 lines of code to 1 neat one. There are 3 things we've done:

1. Made temperatures a constant variable, it can no longer be changed

2. Used the `map` function which along with `filter` and `reduce` use a `for each` loop and most importantly allow us to pass a function as a parameter.

3. Used Javascript's 2015 new anonymous function syntax.

Now, let's find the average temperature. To do this we're going to use the `reduce` function. The `reduce` function takes an array and reduces it to a single element. Below we're going to get the sum of the array of temperatures and divide it by the number elements in the temperatures array.

{% highlight javascript %}
const sumOfTemps = temperatures.reduce((prev,curr)=>{return prev+curr;});
const averageTemp = sumOfTemps/temperatures.length;
#=> 14.932857142857143
{% endhighlight %}

It's relatively straight forward. However, we could make the code more concise as follows:

{% highlight javascript %}
const averageTemp = temperatures.reduce((prev,curr)=>{return prev+curr;})/temperatures.length;
#=> 14.932857142857143
{% endhighlight %}

Congrats!!! In what would've taken multiple lines of code to do we managed to do it in two lines or even just one. A problem you can see with the above snippet is that as you start chaining functions together it comes at the cost of readability.

#### Get the average rainfall

We're going to do what we did in the last example except we're just interested in the rainfall. Since, it doesn't rain everyday we're going to `filter` out the non-rainy days from our data and calculate the average rainfall.

So first things first we're going to filter our array by doing the following:
{% highlight javascript %}
const rainyDays = data.list.filter((day) => {
  return day.weather[0].main === "Rain" && day.rain !== undefined
});
{% endhighlight %}

It's nothing spectacularly different. The key thing here is to note that the callback function must return a `boolean`. <i>Note that there was an error with the data where on 1 day it was raining but there was no rainfall data</i> 😕.

Now we repeat the same steps as we did with the average temperature.

{% highlight javascript %}
const sumOfRainfall = rainyDays.map((day) => {return day.rain;})
  .reduce((prev, curr) => {return prev+curr;});

const averageRainfall = sumOfRainfall/rainyDays.length;
#=> 4.94 cm
{% endhighlight %}

The last thing we wanted to do with our data structure is to be able to zip the min and max temperatures together in a 2D array. Unfortunately Javascript doesn't come bundled with a zip method natively but it isn't too difficult to implement.

{% highlight javascript %}
function zip(arr1,arr2) {
  if (arr1.length <= arr2.length) {
    return arr1.map((x,i)=>{return [x,arr2[i]];});
  }else {
    return arr2.map((x,i)=>{return [arr1[i],x];});
  }
}
zip([1,2,9],[3,4,5,6])
#=> [ [ 1, 3 ], [ 2, 4 ], [ 9, 5 ] ]
{% endhighlight %}

This function is fairly self explanatory. Execpt we use the index of the array we're mapping through to pair up both arrays. Also, note that if one array is longer than the other we discard the remaining elements. In languages that use lazy loading like Haskell it's possible to zip an infinite array with a finite array.

Now using this zip function we can do the following:

{% highlight javascript %}
const minMaxTemps =
  zip(data.list.map((day)=>{
    return day.temp.min;
  }),data.list.map((day)=>{
      return day.temp.max;
    }));
#=> [ [ 4.37, 10.63 ],[ 4.62, 15.68 ],[ 6.03, 19.79 ],
#=> [ 9.73, 14.33 ],[ 10.97, 18.49 ],[ 12.46, 17.19 ],[ 11.62, 16.87 ] ]
{% endhighlight %}

Finally we can use what we've learnt to create this structure by wrapping up our functions into another function that returns the needed structure:
{% highlight javascript %}
function summeriseWeather(data){
  const temperatures = data.list.map((day)=>{return day.temp.day;});
  const sumOfTemps = temperatures.reduce((prev,curr)=>{return prev+curr;});
  const averageTemp = sumOfTemps/temperatures.length;
  const rainyDays =
  data.list.filter((day) => {
    return day.weather[0].main === "Rain" && day.rain !== undefined
  });
  const sumOfRainfall =
  rainyDays.map((day) => {return day.rain;}).reduce((prev, curr) => {return prev+curr;});
  const averageRainfall = sumOfRainfall/rainyDays.length;
  const minMaxTemps =
  zip(data.list.map((day)=>{
    return day.temp.min;
  }),data.list.map((day)=>{
      return day.temp.max;
    }));
  return {
    averageTemp:averageTemp,
    averageRainfall:averageRainfall,
    minMaxTemps:minMaxTemps
  }
}
{% endhighlight %}

What's interesting about writing pure functions is that you break problems into to simple tasks. Which more often than not could be done in parallel. For example, say you were tasked with getting the information above, but for all the cities in the world. You could easily use the above the functions and techniques in a mapreduce model and designate N nodes to calculate the  average temperature, etc.

If you made it this far thanks for reading this post and hopefully you might have found it useful.😊
