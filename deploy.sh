###
 # @Author: Ian
 # @Email: 1136005348@qq.com
 # @Date: 2020-06-21 17:44:33
 # @LastEditTime: 2020-06-21 17:46:11
 # @LastEditors: Ian
 # @Description: 
### 
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
git push -f https://github.com/YinDongFang/blog-dist.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -