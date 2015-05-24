function change(mdfile) {
    loadMarkdown(mdfile);
    $('body').scrollTop(0);
    history.pushState({
            page: mdfile
        },
        mdfile, '#' + mdfile);
}

window.onpopstate = function (event) {
    loadStateContent(event.state);
};

function loadStateContent(state) {
    loadMarkdown(state.page);
}

function loadMarkdown(mdfile) {
    $.ajax(mdfile).done(success);
}

function success(data) {
    var md = data;
    $('#content').html(marked(md));
    setTitle(data);
}

function setTitle(data) {
    var start = data.indexOf('# ');
    var end = data.indexOf('\n');
    if (start > -1) {
        var title = data.substring(start + 2, end);
        if (imageBase) {
            title = title.replaceAll();
        }
        $('title').html(title);
    }
}

$(function () {
    var mdfile = getMdFile();
    change(mdfile);
});

var mdFile = 'intellij/intellij-shortcuts.md';
var imageBase = '';

function getMdFile() {
    var href = location.href;
    if (href.indexOf('#') > 0) {
        var hash = href.substring(href.indexOf('#') + 1);
        mdFile = hash;
    }
    return mdFile;
}
