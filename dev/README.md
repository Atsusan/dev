# dev

【概要】
web制作開発環境です。
静的サイトやWordPress化への開発が可能です。

通常は静的サイト作成用に設定されています。
（WordPress化での開発はgulpファイルにて、変更設定する必要あり。）

【使用方法】
1　projectファイルを作成し、devをクローンする。

    ディレクトリ構造
    project - dev

2 projectファイルをVScodeで開き、devファイルへ移動

3 node.jsをインストールする

4 npx gulp build　にてpublicファイルが生成される

5 npx gulp dev にて開発できます。
