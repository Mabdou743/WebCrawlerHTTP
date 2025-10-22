const {normalizeUrl, getURLsFromHTML} = require('./crawl.js');
const {test, expect} = require('@jest/globals')

test('normalizeUrl strip protocol',()=>{
    const input ='https://blog.boot.dev/path';
    const actual = normalizeUrl(input);
    const expected = 'blog.boot.dev/path';

    expect(actual).toEqual(expected);
})

test('normalizeUrl strip slash',()=>{
    const input ='https://blog.boot.dev/path/';
    const actual = normalizeUrl(input);
    const expected = 'blog.boot.dev/path';

    expect(actual).toEqual(expected);
})

test('normalizeUrl strip http',()=>{
    const input ='http://blog.boot.dev/path';
    const actual = normalizeUrl(input);
    const expected = 'blog.boot.dev/path';

    expect(actual).toEqual(expected);
})

test('getURLsFromHTML Absolute',()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev">
                Boot.dev Blog
            </a>
        </body>
    <html>
    `
    const inputBaseURL ='https://blog.boot.dev';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://blog.boot.dev/'];

    expect(actual).toEqual(expected);
})

test('getURLsFromHTML Relative',()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev Blog
            </a>
        </body>
    <html>
    `
    const inputBaseURL ='https://blog.boot.dev';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://blog.boot.dev/path/'];

    expect(actual).toEqual(expected);
})

test('getURLsFromHTML Both',()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path1/">
                Boot.dev Blog path1
            </a>
            <a href="https://blog.boot.dev/path2/">
                Boot.dev Blog path2
            </a>
        </body>
    <html>
    `
    const inputBaseURL ='https://blog.boot.dev';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/'];

    expect(actual).toEqual(expected);
})

test('getURLsFromHTML Invalid',()=>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                invalid
            </a>

        </body>
    <html>
    `
    const inputBaseURL ='https://blog.boot.dev';
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];

    expect(actual).toEqual(expected);
})