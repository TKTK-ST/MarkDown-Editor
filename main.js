var mdvalue, view = document.getElementById("view") , obj1 = document.getElementById("selfile");
var all_html, all_md;


function escape_html (string) {
    if(typeof string !== 'string') {
      return string;
    }
    return string.replace(/[&'`"<>]/g, function(match) {
        return {
           '&': '&amp;',
           "'": '&#x27;',
           '`': '&#x60;',
           '"': '&quot;',
           '<': '&lt;',
           '>': '&gt;',
          }[match]
    });
}

function conversion(){
    mdvalue = document.test.txt.value;
    mdvalue = mdvalue.replace(/(\*\*)(.*)(\*\*)/g,'<span style="color:#ff0000;">$2</span>');
    view.innerHTML = marked(mdvalue);
    view.scrollTop = view.scrollHeight;
}

window.onload = function(){
    all_md = false;
    all_html = false;
    document.test.txt.addEventListener( "input", conversion);
    window.addEventListener( "keydown", function(event){
        if (event.ctrlKey || event.metaKey){
            switch (event.keyCode){
                case 68:
                    event.preventDefault();     
                    event.stopPropagation();
                    if (all_html || all_md){
                        view.style.left = "";
                        view.style.width = "";
                        document.test.txt.style.display = "";
                        document.test.txt.style.left = "";
                        document.test.txt.style.width = "";
                        view.style.display = "";
                    }
                    all_html = false;
                    all_md = false;
                    break;
                case 72:
                    //alert('Ctrl+H');
                    event.preventDefault();     
                    event.stopPropagation();
                    if (!all_html){
                        view.style.left = "5%";
                        view.style.width = "85%";
                        document.test.txt.style.display = "none";
                        all_html = true;
                        all_md = false;
                        if(!all_md){
                            view.style.display = "block"
                        }
                    }
                    break;
                case 77:
                    //alert('Ctrl+M');
                    if (!all_md){
                        document.test.txt.style.width = "85%";
                        view.style.display = "none";
                        all_md = true;
                        all_html = false;
                        if(!all_html){
                            document.test.txt.style.display = "block";
                        }
                    }
                    break;
                case 83:
                    alert('Ctrl+S');
                    event.preventDefault();     
                    event.stopPropagation();
                    break;           
            }
        }
    }, false);
}

//ダイアログでファイルが選択された時
obj1.addEventListener("change",function(evt){
    if (!document.getElementById('selfile').value.toUpperCase().match(/\.(MD)$/i)) {
        alert('拡張子がMarkdownではありません。');
        document.getElementById('selfile').value = "";
        return;
    }  

    var file = evt.target.files;

    //FileReaderの作成
    var reader = new FileReader();
    //テキスト形式で読み込む
    reader.readAsText(file[0]);
  
    //読込終了後の処理
    reader.onload = function(ev){
        //テキストエリアに表示する
        document.test.txt.value = reader.result;
        var mdvalue = document.test.txt.value;
        var view = document.getElementById("view");
        view.innerHTML = marked(mdvalue);
        //document.test.txt.value = marked(mdvalue);
    }
},false);