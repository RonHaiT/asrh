---
title: Django基础
published: 2025-03-30
description: "Django基础"
tags: ["Django","Python"]
category: Python
draft: false
---

# 系统环境

python版本:Python3.11.9

django版本:Django 5.1.7

安装好了python版本用Pycharm创建时,指定了python版本会自动下载相应的django版本

![image-20250326213811201](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250326213811201.png)

![image-20250326213927722](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250326213927722.png)

## django的MTV

Django的MTV框架模式

- Model 模型
- Template 模板
- Views 视图

## 手动安装Django

```bash
pip install django
pip install django==4.2.4
```



## django命令

输入python manage.py会看到所有的django命令

指令文档:https://docs.djangoproject.com/zh-hans/5.1/ref/django-admin/

![image-20250326214217038](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250326214217038.png)

Django指令有31条,每条指令说明如下表格所示:

| 指令                      | 说明                                                         |
| ------------------------- | ------------------------------------------------------------ |
| changepassword            | 修改内置用户表的用户密码                                     |
| createsuperuser           | 为内置用户表创建超级管理员帐号                               |
| remove_stale_contenttypes | 删除数据库中已经不使用的数据局表                             |
| check                     | 检测整个项目是否存在异常                                     |
| compilemessages           | 编译语言文件,用于项目的区域语言设置                          |
| createcachetable          | 创建缓存数据表,为内置的缓存机制提供存储功能                  |
| dbshell                   | 进入Django配置的数据库,可以执行数据库的SQl语句               |
| diffsettings              | 显示当前settings.py的配置信息与默认配置的差异                |
| dumpdata                  | 导出数据表的数据并以JSON格式存储,如python manage.py dump data index>data.json,这是index的模型所对应的数据导出,并保存在data.json文件中 |
| flush                     | 清空数据表的数据信息                                         |
| inspectdb                 | 获取项目所有模型的定义过程                                   |
| loaddata                  | 将数据文件导入数据表,如python manage.py loaddata data.json   |
| makemessages              | 创建语言文件,用于项目的区域语言设置                          |
| makemigrations            | 从模型对象创建数据迁移文件并保存在App的migrations文件夹中    |
| migrate                   | 根据迁移文件的内容,在数据里生成相应的数据表                  |
| optimizemigration         | 优化迁移操作并覆盖现有的迁移文件                             |
| sendtestemail             | 抽指定的收件人发送测试的电子邮件                             |
| shell                     | 进入Django的Shell模式,用于调试项目功能                       |
| showmigrations            | 查看当前项目的所有迁移文件                                   |
| sqlflush                  | 查看清空数据库的SQL语句脚本                                  |
| sqlmigrate                | 根据迁移文件内容输出相应的SQL语句                            |
| sqlsequencereset          | 重置数据表递增字段 的索引 值                                 |
| squashmigrations          | 对迁移文件进行压缩处理                                       |
| startapp                  | 创建项目应用App                                              |
| startproject              | 创建新的Django项目                                           |
| test                      | 运行App里面的测试程序                                        |
| testserver                | 新建测试数据库,并使用该数据库运行项目                        |
| clearsessions             | 清除会话(Session)数据                                        |
| collectstatic             | 收集所有的静态文件                                           |
| findstatic                | 查找静态文件的路径信息                                       |
| runserver                 | 在本地计算机上启动Django项目                                 |

## 命令创建项目

```bash
python manage.py startproject 项目名
#如果创建到当前文件夹项目名后面加个.
python manage.py startproject  .
```

## 命令创建App

```bash
# 创建到根目录下的app
python manage.py startapp App名 
#如果创建到指定目录下,如在apps下生成index App.需要先建立apps/index文件夹在执行以下命令
python manage.py startapp index  apps/index
```

![image-20250326221011122](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250326221011122.png)

# 常用配置

## 注册app

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # 注册app
    'account.apps.AccountConfig'
]
```

## 中文显示

```python
# 中文显示 
LANGUAGE_CODE = 'zh-hans'
# 时区上海
TIME_ZONE = 'Asia/Shanghai'

# 设置中间件
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # 添加中间件: LocaleMiddleware django内置功能中文显示
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

## 数据库配置

django提供了5种数据库引擎

- django.db.backends.sqlite3
- django.db.backends.mysql
- django.db.backends.oracle
- django.db.backends.postgresql
- django.db.backends.postgresql_psycopg2

### sqlite3

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

### mysql

使用mysql需要安装连接模块

```bash
 pip install mysqlclient  #安装时需要本地安装了mysql
```

django对mysqlclient版本有使用有要求,可以在django的源码查看mysqlclient版本要求

![image-20250327213932855](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250327213932855.png)

```bash
pip install pymysql
```

在项目的`__init__.py`中增加以下代码

```python
import pymysql
pymysql.install_as_MySQLdb()
```

两者选择其一,不建议同时使用

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',  # 使用 MySQL
        'NAME': 'blog',  # 数据库名称
        'USER': 'root',  # MySQL 用户
        'PASSWORD': '123456',  # MySQL 密码
        'HOST': 'localhost',  # 数据库服务器地址，远程则改为 IP 地址
        'PORT': '3306',  # MySQL 端口，默认 3306
        'OPTIONS': {
            'charset': 'utf8mb4',  # 推荐使用 utf8mb4 支持 Emoji
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",  # 避免非严格模式带来的数据问题
        },
    }
}
```

如果使用MySQL的版本是8.0以上,会提示django.utils.OperationaError错误信息,因为MySQL8.0以上的加密方式发生了改变,用户密码彩的是CHA2(caching_sha2_password)加密方式

解决报错用管理员登录mysql执行以下代码:

```bash
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'newpassword';
FLUSH PRIVILEGES;
```

多个数据库连接

```pytho
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    },
    'MyIndex': {
        'ENGINE': 'django.db.backends.mysql',  # 使用 MySQL
        'NAME': 'my_index',  # 数据库名称
        'USER': 'root',  # MySQL 用户
        'PASSWORD': '123456',  # MySQL 密码
        'HOST': 'localhost',  # 数据库服务器地址，远程则改为 IP 地址
        'PORT': '3306',  # MySQL 端口，默认 3306
        'OPTIONS': {
            'charset': 'utf8mb4',  # 推荐使用 utf8mb4 支持 Emoji
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",  # 避免非严格模式带来的数据问题
        },
    },
    'mysqlbak': {
        'ENGINE': 'django.db.backends.mysql',  # 使用 MySQL
        'NAME': 'mysqlbak',  # 数据库名称
        'USER': 'root',  # MySQL 用户
        'PASSWORD': '123456',  # MySQL 密码
        'HOST': 'localhost',  # 数据库服务器地址，远程则改为 IP 地址
        'PORT': '3306',  # MySQL 端口，默认 3306
        'OPTIONS': {
            'charset': 'utf8mb4',  # 推荐使用 utf8mb4 支持 Emoji
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",  # 避免非严格模式带来的数据问题
        },
    }
}
```

若项目中连接了多个数据库,每个模型所对应的数据表可以选择在某个数据库中生成,如果 没有模型没有指向某个数据库,则模型就会在key为default的数据库中生成.

### 配置文件

在项目根目录新建`my.cnf`文件增加以下配置

```python
# my.cnf
[client]
database=index
user=root
password=root123456
host=127.0.0.1
port=3306
```

编写配置文件my.cnf必须设置[clinet]分组,settings.py配置DATABASE配置信息如下:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',  # 使用 MySQL
        'OPTIONS':{'read_default_file':str(BASE_DIR/'my.cnf')},
    },
}
```

执行生成数据表(配置不能有中文)

```bash
python manage.py migrate
```

查看数据表

![image-20250330135307816](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250330135307816.png)

更改index的view.py

```python
from django.shortcuts import render
from django.contrib.contenttypes.models import ContentType

def home(request):
    c=ContentType.objects.values_list().all()
    print(c)
    return render(request, 'home.html')
```

![image-20250327221235396](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250327221235396.png)

## 静态和媒体文件

### 资源路由

在``DEBUG=True`时,STATIC_URL,默认创建项目就有配置,可以旋转css,js,images等静态资源,注册了的app下的static下的文件可以访问

```python
STATIC_URL = 'static/'
```

![image-20250327192828692](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250327192828692.png)

![image-20250327192844290](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250327192844290.png)

![image-20250327193034586](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250327193034586.png)

以上配置在根目录访问static中的文件是访问不了,如果注册的app换了一个名称也是不能识别的,用到STATICFILES_DIRS

### 资源整合

STATICFILES_DIRS就是处理多个静态文件目录的

```python
# 静态文件
STATIC_URL = 'static/' # 静态文件的路由地址
STATICFILES_DIRS = [
    BASE_DIR / "static", # 配置项目的static,就是项目根目录的static
    # BASE_DIR / "article/static",
]

```

![image-20250330135541154](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250330135541154.png)

![image-20250327193431519](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250327193431519.png)

配置app下的其它目录

```python
STATIC_URL = 'static/' # 静态文件的路由地址
STATICFILES_DIRS = [
    BASE_DIR / "static", # 配置项目的static,就是项目根目录的static
    BASE_DIR / "index/Mystatic", # 配置index App下的Mystatic为静态文件目录
]
```

当访问static可以访问根目录的static,也可以访问注册app下的static,还可以访问注册app的Mystatic下的文件

如果改了`STATIC_URL = 'allStatic/'`,访问的地址就是这个目录

```bash
STATIC_URL = 'allStatic/' # 静态文件的路由地址
STATICFILES_DIRS = [
    BASE_DIR / "static", # 配置项目的static,就是项目根目录的static
    BASE_DIR / "index/Mystatic", # 配置index App下的Mystatic为静态文件目录
]
```

![image-20250327194029427](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250327194029427.png)

![image-20250327194039974](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250327194039974.png)

![image-20250327194203684](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250327194203684.png)

### 资源部署

STATIC_ROOT,是在服务器上部署项目时,收集整个项目的静态资源并存放在一个新的文件夹中,以实现服务器和项目之间的映射关系.配置如下:

```python
STATIC_ROOT = BASE_DIR / 'AllStatic'
```

设置STATIC_ROOT需要使用Django操作指令python manage.py collectstatic来收集所有静态资源到配置文件夹中

可以设置服务器的一个绝对路径,需要有写入权限

### 媒体文件

一般情况下,STATIC_URL用于设置静态文件的路由地址,如css,js以及常用图片等.

对于经常变动的资源,如用户上传的头像,歌曲文件等,通常存放在媒体资源文件夹中.

设置如下:

```python
# 媒体文件路由地址
MEDIA_URL = '/media/'
# 获取media文件夹的完整路径信息
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

设置完成属性后,还需要将media文件夹注册到Django中.以便让Django知道如何找到媒体文件,否则无法在浏览器中访问该文件夹内的文件信息.

打开项目文件中的urls.py,为媒体文件夹media添加相应的路由地址.

```python
from django.contrib import admin
from django.urls import path, re_path
# 配置媒体文件夹media路由地址
from django.views.static import serve
from django.conf import settings

# 方法一
urlpatterns = [
    path('admin/', admin.site.urls),
    re_path('media/(?P<path>.*)', serve, {'document_root': settings.MEDIA_ROOT}, name='media')
]
# 方法二
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

```

settings

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates']
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                # 将media_url上传文件路径注册到横版中
                'django.template.context_processors.media'
            ],
        },
    },
]
```

配置完成后重启服务,访问media下的文件,可以正常访问

![image-20250327202545320](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250327202545320.png)

![image-20250327202555993](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250327202555993.png)

## 模板配置

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # 注册根目录和index下的templates文件夹
        'DIRS': [
            BASE_DIR / 'templates',
            BASE_DIR / 'index/templates',
        ],
        'APP_DIRS': True, # 是否在app中查找模板
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                # 将media_url上传文件路径注册到横版中
                'django.template.context_processors.media'
            ],
        },
    },
]
```

###  测试设置是否成功

在根目录的templates下新建404.html和500.html处理服务器错误和404页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>404页面</h1>
</body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>500页面</h1>
</body>
</html>
```

在app index的templates下新建home.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>home页面</h1>
</body>
</html>
```

在index的views设置处理路由函数

```python
from django.shortcuts import render


def home(request):
    return render(request, 'home.html')


def custom_404_view(request):
    return render(request, '404.html')


def custom_500_view(request):
    return render(request, '500.html')
```

设置路由

```python
from django.contrib import admin
from django.urls import path, re_path
from index import  views
# 配置媒体文件夹media路由地址
from django.views.static import serve
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home), # 首页
    re_path('media/(?P<path>.*)', serve, {'document_root': settings.MEDIA_ROOT}, name='media')
]

```

settings.py

```python
DEBUG = False

ALLOWED_HOSTS = ['*']
```

![image-20250327204549965](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250327204549965.png)

![image-20250327205152750](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250327205152750.png)

![image-20250327205207579](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250327205207579.png)

首页路由设计一个错误

```python
from django.shortcuts import render

def home(request):
    # 测试服务器500
    print(fsfsd)
    return render(request, 'home.html')
```

![image-20250327205253209](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250327205253209.png)

全部都可以访问

## 中间件

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # 添加中间件: LocaleMiddleware django内置功能中文显示,国际化和本地化功能
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

每个中间件的设置顺序是固定的,如果 随意变更中间件,容易导致异常,说明如下:

- SecurityMiddleware: 内置的安全机制,用于保护用户与网络的通信安全

- SessionMiddleware: 会话功能

- LocaleMiddleware:国际化和本地化功能

- CommonMiddleware:处理请求信息,规范化请求崆

- CsrfViewMiddleware:开启CSRF防护功能

- AuthenticationMiddleware:开启内置的用户认证系统

- MessageMiddleware:开启内置的信息提示功能

- XFrameOptionsMiddleware:防止恶意程序单击劫持

  

## 用户模型

```python
AUTH_USER_MODEL = 'user.UserInfo'
```

# 路由系统

## 路由定义

路由地址就是我们常说的网址，而视图函数(或者视图类)则是在App的views.py文件中定义的函数(或类)

路由的变量的类型有字符串类型、整型、lug和uuid，最为常用的是字符串类型和整型。

路由列表 由urlpatterns 变量表示，每个列表元素代表一条路由。一个列表由三部分组成 ：

- 第一个参数路由地址
- 第二个参数路由所对应的处理函数（视图函数或视图类）
- 第三个参数为路由之外的参数，参数为字典类型

类型说是如下：

- 字符串类型：匹配任何非空字符串，但不含斜杠。如果没有指定类型,默认使用该类型。
- 整型：匹配0和正整数
- Slug：可理解为注释，后缀或附属等该概念，常作为路由的解释性字符。可以匹配任何ASSII 字符以及连接符和下画线，能使路由更加清晰易懂。
- UUID：匹配一个 uuid 格式的对象。为了防止冲突，规定必须使用“-”，并且怕有字母必须小写。

在路由中，使用变量符号"<>"可以为路由设置变量。括号里面的内容以冒号划分为两部分，冒号前面代表的是变量的数据类型，冒号后面代表的是变量名，变量名可自行命名。

### 正则表达式路由

路由的正则表达示是路由函数 re_path 定义的，作用是对路由地址进行截取与判断。正则表达示以圆括号为单位，每个圆括号的前后可以使用斜杠或者其它字符来分隔或结束。

变量以一个圆括号为单位以(?P<year>[0-9]{4})解释：

- ?P 是固定格式，字母 P 必须为大写。
- <year>为变量名
- [0-9]{4}是正则表达式的匹配模式，代表变量长度为4，只允许0-9的值。

## 命名空间与路由命名

### 命名空间

路由分发的时候可以指定命名空间

路由函数 include 设有参数 arg 和 namespace,参数 arg 指向项目应用 App 的 urls.py 文件，其数据格式以元组或字符串表示，可选参数 namespace 是路由的命名空间。

要对路由设置参数 namespace，则参数arg 必须以元组格式表示，并且元组的长度必须为2.元组的元素说明如下：

- 第一个元素为项目应用的 urls.py 文件
- 第二个元素可以自行命名，但不能为空。通常情况下，会将其命名为项目应用 app的名称，如('index.urls','index')

如果设置了参数 namespace，并且参数 arg为字符串或元组长度不足2，则运行 djadngo 项目会报以下错误

`django.core.exceptions.ImproperlyConfigured: Specifying a namespace in include() without providing an app_name is not supported. Set the app_name attribute in the included module, or pass a 2-tuple containing the list of patterns and app_name instead.`

 ![image-20250330133035494](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250330133035494.png)

正确的配置如下：

```python
from django.contrib import admin
from django.urls import path, re_path, include
from index import views
# 配置媒体文件夹media路由地址
from django.views.static import serve
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(('index.urls', 'index'), namespace='index')), # 正确配置
    path('user/', include(('user.urls','user'), namespace='user')), # 正确配置
    re_path('media/(?P<path>.*)', serve, {'document_root': settings.MEDIA_ROOT}, name='media')
]
```

### 路由命名

指定路由处理的视图函数或视图类时可以指定路由的地址 name如下:

```python
from django.urls import re_path, path
from . import views

urlpatterns = [
    path('', views.profile, name='userProfile'),
    path('login/', views.login, name='userLogin'),
    path('register/', views.register, name='userRegister'),
]
```

![image-20250330134125023](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250330134125023.png)

![image-20250330134147376](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250330134147376.png)

## 反射解析

Django 反射解析主要由函数 reverse 和 resolve 实现：

- 函数reverse 是通过路由命名或可调用视图对象来生成路由地址
- 函数 resolve 是通过路由地址来获取路由对象信息的

```python
from django.shortcuts import render, reverse
from django.urls import resolve


def home(request):
    result = reverse('user:userRegister')
    res = resolve(result)
    print(result)
    print(res)
    return render(request, 'home.html')
```

访问首页返回

```python
/user/register/
ResolverMatch(func=user.views.register, args=(), kwargs={}, url_name='userRegister', app_names=['user'], namespaces=['user'], route='user/register/')
```

### reverse

源码

```python
def reverse(viewname, urlconf=None, args=None, kwargs=None, current_app=None):
    if urlconf is None:
        urlconf = get_urlconf()
    resolver = get_resolver(urlconf)
    args = args or []
    kwargs = kwargs or {}

    prefix = get_script_prefix()

    if not isinstance(viewname, str):
        view = viewname
    else:
        *path, view = viewname.split(":")
        .....
```

函数 reverse 中设必选参数viewname，其余参数是可选参数，参数说明如下：

- viewname：代表路由命名或可调用视图对象，一般情况下是以路由命名 name 来生成路由地址
- urlconf：设置反向解析的 URLconf 模块。默认情况下，使用配置文件 settings.py的 ROOT_URLCONF属性
- args：以列表方式传递路由地址变量，列表元素顺序和数量应与路由地址变量的顺序和数量一致
- kwargs：以字典方式传递路由地址变量，字典 的键必须对应路由地址变量名，字典键值对数量 与变量的数量要一致
- current_app：提示当前正在执行的视图所在的项目应用，主要起到提示作用，在功能上并无实质的作用

一般情况下中需高雷函数 reverse 的参数 viewname 即可，如果路由地址设有变量，可自行设置参数 args 或 kwargs 来设置路由的变量值。但是 args 和 kwargs 不能同时设置，否则会提示 ValueError报错信息。

```python
from django.urls import re_path, path
from . import views

urlpatterns = [
    path('', views.profile, name='userProfile'),
    path('login/', views.login, name='userLogin'),
    path('register/<str:a>', views.register, name='userRegister'),
]
```



```python
from django.shortcuts import render, reverse
from django.urls import resolve


def home(request):
    result = reverse('user:userRegister',args=['a'])
    res = resolve(result)
    print(result) # /user/register/a
    print(res)
    return render(request, 'home.html')

```

同时设置报错

```python
from django.shortcuts import render, reverse
from django.urls import resolve


def home(request):
    b=1
    result = reverse('user:userRegister',args=['a'],kwargs={'b':b})
    res = resolve(result)
    print(result)
    print(res)
    return render(request, 'home.html')
```

![image-20250330161301955](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250330161301955.png)

### resolve

源码

```python
def resolve(path, urlconf=None):
    if urlconf is None:
        urlconf = get_urlconf()
    return get_resolver(urlconf).resolve(path)
```

函数 resolve 设有两个参数，path 是必选参数 ，urlfconf 是可选参数，参数说明如下：

- path：代表路由地址，通过路由地址来获取对应的路由对象信息。
- urlconf：设置反向解析的 URLconf模块。在默认情况下，使用配置 settings.py 的 ROOT_URLCONF属性
- 返回值如下：

```python
ResolverMatch(func=user.views.register, args=(), kwargs={}, url_name='userRegister', app_names=['user'], namespaces=['user'], route='user/register/')
```

## 路由重定向

Django 的网页重定向有两种方式：

- 路由重定向，使用 Django 内置的 RedirectView 实现，默认支持 HTTP 的 GET 请求
- 自定义视图的重定向，在自定义视图的响应状态设置重定向

### 路由重定向

```python
from django.views.generic import  RedirectView
urlpatterns = [
    path('', views.home, name='home'),
    path('turnTo/', RedirectView.as_view(url='/'), name='turnTo'),
]
```

### 视图重定向

- HttpResponseRedirect 状态码301，永久性跳转
- HttpResponsePermanentRedirect 状态码302，临时的跳转，搜索引擎认为新的网址只是暂时的
- 函数redirect

HttpResponseRedirect和HttpResponsePermanentRedirect的使用只需传入路由地址即可，不支持路由命名的传入，所以有了函数 redirect

源码

```python
def redirect(to, *args, permanent=False, **kwargs):
    redirect_class = (
        HttpResponsePermanentRedirect if permanent else HttpResponseRedirect
    )
    return redirect_class(resolve_url(to, *args, **kwargs))
  
 def resolve_url(to, *args, **kwargs):
    # If it's a model, use get_absolute_url()
    if hasattr(to, "get_absolute_url"):
        return to.get_absolute_url()

    if isinstance(to, Promise):
        # Expand the lazy instance, as it can cause issues when it is passed
        # further to some Python functions like urlparse.
        to = str(to)

    # Handle relative URLs
    if isinstance(to, str) and to.startswith(("./", "../")):
        return to

    # Next try a reverse URL resolution.
    try:
        return reverse(to, args=args, kwargs=kwargs)
    except NoReverseMatch:
        # If this is a callable, re-raise.
        if callable(to):
            raise
        # If this doesn't "feel" like a URL, re-raise.
        if "/" not in to and "." not in to:
            raise

    # Finally, fall back and assume it's a URL
    return to
```

```python
from django.shortcuts import render, reverse,redirect

def home(request):
    return redirect(reverse('user:userLogin'))
```

# FBV视图

网站运行遵循 HTTP 协议，核心交互由 HTTP 请求和 HTTP 响应组成。

## 响应方式

HTTP响应方式也被称为 HTTP 状态码

- 第一种：消息状态码、成功状态码、重定向状态码、请求错误状态码、服务器错误码五种
- 第二种：成功状态码、重定向状态码、异常响应状态码(客户端请求错误和服务器错误)三种。

### 返回响应内容

视图函数通过 return 方式返回响应内容，设置不同的响应方式，则需要使用Django 内置的响应类，如下表：

| 响应类型                           | 说 明                                       |
| ---------------------------------- | ------------------------------------------- |
| HttpResponse('hello world')        | 状态码200，请已成功被服务器接收             |
| JsonResponse({'foo':'bar})         | 状态码200， 响应内容为 JSON 数据            |
| StreamingHttpResponse()            | 状态码200， 响应内容以流式输出              |
| HttpResponseRedirect('/')          | 状态码302，重定向首页                       |
| HttpResponsePermanentRedirect('/') | 状态码301，永久重定向重定向首页             |
| HttpResponseBadRedirect('400')     | 状态码400，访问的页面不存在或请求错误       |
| HttpResponseNotRedirect('404')     | 状态码404，访问的页面不存在或网页的URL 失效 |
| HttpResponseForbidden('403')       | 状态码403，没有访问权限                     |
| HttpResponseNotAllowed('405')      | 状态码405，不允许使用该请求方式             |
| HttpResponseServerErrord('500')    | 状态码500，服务器内容错误                   |

> 以上响应类主要来自模块Django.http

打开源码发现响应类都是在 HttpResponse 的基础上实现的，只不过他们的HTTP状态码有所不同。

![image-20250330183631821](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250330183631821.png)

### render

因为HttpResponse的使用过程要生成网页内容，就需要将 HTML 语言以字符串的形式表示，如果网页过大，就会增加视图函数的代码量，同时也没有体现模板的作用，因为 Django 在此基础上进行了封装处理，定义了函数 render 和 redirect。部分源码如下：

```python
def render(
    request, template_name, context=None, content_type=None, status=None, using=None
):
    """
    Return an HttpResponse whose content is filled with the result of calling
    django.template.loader.render_to_string() with the passed arguments.
    """
    content = loader.render_to_string(template_name, context, request, using=using)
    return HttpResponse(content, content_type, status)


def redirect(to, *args, permanent=False, **kwargs):
    """
    Return an HttpResponseRedirect to the appropriate URL for the arguments
    passed.

    The arguments could be:

        * A model: the model's `get_absolute_url()` function will be called.

        * A view name, possibly with arguments: `urls.reverse()` will be used
          to reverse-resolve the name.

        * A URL, which will be used as-is for the redirect location.

    Issues a temporary redirect by default; pass permanent=True to issue a
    permanent redirect.
    """
    redirect_class = (
        HttpResponsePermanentRedirect if permanent else HttpResponseRedirect
    )
    return redirect_class(resolve_url(to, *args, **kwargs))
```

render 的 request 和 template_name 参数是必选参数，其余的是可选参数，各参数说明如下：

- request：浏览器向服务器发送的请求对象，包含用户信息、请求内容和请求方式等
- templaet_name：模板文件名，用于生成网页内容
- context：对模板上下文赋值中，以字典格式表示，默认情况下是一个空字典
- content_type：响应内容的数据格式，一般情况下使用默认值即可
- status：HTTP 状态码，默认为200
- using：设置模板引擎，用于解析模板文件，生成网页内容

### 异常响应

异常响应是指 HTTP 状态码为404或500的响应状态，它与正常的响应过程是一样的，只是 HTTP 状态码有所不同。使用 render 函数作为响应过程，设置参数status 状态码为404或500即可实现异常响应

```python
def home(request):
    return render(request, 'home.html', status=404)
```

![image-20250330190836889](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250330190836889.png)

```python
def home(request):
    return render(request, 'home.html', status=500)
```

![image-20250330190904767](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250330190904767.png)

全局设置异常响应页面

`urls.py`

```python
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(('index.urls', 'index'), namespace='index')),
]
handler404 = 'index.views.page_not_found'
handler500 = 'index.views.page_not_error'
```

`views.py`

```python
from django.shortcuts import render
from django.http import Http404

def home(request):
    if request.GET.get('error',''):
        raise Http404('没有找到页面')
    return render(request, 'home.html')

def page_not_found(request,exception):
    return render(request, '404.html', status=404)

def page_not_error(request):
    return render(request, '500.html', status=500)
```

![image-20250330191946289](https://cdn.jsdelivr.net/gh/RonHaiT/Image-hosting/image-20250330191946289.png)

### 文件下载

Django 提供了三种方式来实现下载功能，分别是 HttpResponse、StreamingHttpResponse 和 FileResponse

- HttpResponse 是所有响应过程的核心类，它的底层功能是 HttpResponseBase
- StreamingHttpResponse是在HttpResponseBase 基础上进行继承和重写的，实现流式响应输出，适用于大规模数据响应和文件传输响应
- FileResponse 是在 StreamingHttpResponse 的基础上进行继承和重写，实现文件的流式响应输出，只适用于文件传输响应

`urls.py`

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('download/file1', views.download1, name='download1'),
    path('download/file2', views.download2, name='download2'),
    path('download/file3', views.download3, name='download3'),
]
```

`views.py`

```python
from django.http import Http404, HttpResponse, StreamingHttpResponse, FileResponse


def home(request):
    return render(request, 'home.html')


def download1(request):
    file_path = '/Users/rh/Pictures/10.jpg'
    try:
        r = HttpResponse(open(file_path, 'rb'))
        r['content_type'] = 'application/octet-stream'
        r['Conntent-Disposition'] = 'attachment;filename=10.jpg'
        return r
    except Exception:
        raise Http404('下载错误')


def download2(request):
    file_path = '/Users/rh/Pictures/9.jpg'
    try:
        r = StreamingHttpResponse(open(file_path, 'rb'))
        r['content_type'] = 'application/octet-stream'
        r['Conntent-Disposition'] = 'attachment;filename=9.jpg'
        return r
    except Exception:
        raise Http404('下载错误')


def download3(request):
    file_path = '/Users/rh/Pictures/8.jpg'
    try:
        f = open(file_path, 'rb')
        r = FileResponse(f, as_attachment=True, filename='7.jpg')
        return r
    except Exception:
        raise Http404('下载错误')
```

以上三个都能实现下载，前两个都是以流的方式返回，第三个可以直接下载文件：

- HttpResponse实现文件下载存在很大的弊端，其工作原理是将文件读取并载入内存，然后输出到浏览器上实现下载功能。如果下载的文件较大，会占用很多内存，下载大文件 Django 推荐使用StreamingHttpResponse和FileResponse，这两个方法将下载文件分批写入服务器的本地磁盘，而不将文件载入服务器的内存。
- StreamingHttpResponse和FileResponse实现原理是一样的，都是把文件分批写入服务器的本地磁盘，实现文件的流式响应输出
- 从适用范围来说，StreamingHttpResponse适用范围更为广泛，可支持大规模数据或文件输出，而FileResponse只支持文件输出
- 从适用方式来说，StreamingHttpResponse支持数据格式或文件输出，因此在使用时需要设置响应输出类型和方式，而FileResponse只需要设置3个参数即可实现文件下载功能。

## HTTP请求对象

WSGIRequest 的源码

```python
class WSGIRequest(HttpRequest):
    def __init__(self, environ):
        script_name = get_script_name(environ)
        # If PATH_INFO is empty (e.g. accessing the SCRIPT_NAME URL without a
        # trailing slash), operate as if '/' was requested.
        path_info = get_path_info(environ) or "/"
        self.environ = environ
        self.path_info = path_info
        # be careful to only replace the first slash in the path because of
        # http://test/something and http://test//something being different as
        # stated in RFC 3986.
        self.path = "%s/%s" % (script_name.rstrip("/"), path_info.replace("/", "", 1))
        self.META = environ
        self.META["PATH_INFO"] = path_info
        self.META["SCRIPT_NAME"] = script_name
        self.method = environ["REQUEST_METHOD"].upper()
        # Set content_type, content_params, and encoding.
        self._set_content_type_params(environ)
        try:
            content_length = int(environ.get("CONTENT_LENGTH"))
        except (ValueError, TypeError):
            content_length = 0
        self._stream = LimitedStream(self.environ["wsgi.input"], content_length)
        self._read_started = False
        self.resolver_match = None

    def _get_scheme(self):
        return self.environ.get("wsgi.url_scheme")
```

从类 WSGIRequest 的定义中可以看到，它继承并重写类 HttpRequest，若要获取 请求信息，只需从类 WSGIRequest 中读取相关的属性即可，常用的属性说明：

- COOKIE：获取客户端的 Cookie 信息，以字典形式表示，键值对都是字符串类型
- FILES：django.http.request.QueryDict 对象，包含所有的文件上传信息
- GET：获取 GET请求的请求参数，它是 django.http.request.QueryDict 对象，操作起来类似字典
- POST：获取 POST请求的请求参数，它是 django.http.request.QueryDict 对象，操作起来类似字典
- META：获取客户端的请求头 信息，以字典形式存储
- method：获取当前请求的请求方式(GET或POST等)
-  path：获取当前的请求的路由地址
- seesion： 一个类似于字典 的对象，用来操作服务器的会话信息，可临时存放用户信息
- user：当 Django 启用 AuthenticationMiddleware 中间件才可用。它的值是内置数据模型 User的对象，表示当前登录的用户。如果 用户当前没有登录，那么 user将设为 django.contrib.auth.models.AnonymousUser 的一个实例。

```python
def home(request):
    if request.method == "GET":
        # 类方法
        print(request.is_secure())  # False
        print(request.get_host())  # 127.0.0.1:8000
        print(request.get_full_path())  # /?a=1
        print(request._get_raw_host())  # 127.0.0.1:8000
        # 属性
        print(
            request.COOKIES)  # {'tabstyle': 'html-tab', 'csrftoken': 'oeNyArLZQEXzNdBDaAqsbJZ71oUPToaY', 'sessionid': 'vytfk2km52ryy58e47fb7y9yc2jrm2ne'}
        print(request.content_type)  # text/plain
        print(request.content_params)  # {}
        print(request.scheme)  # http
        print(request.GET.get('user', ''))

        return render(request, 'home.html')
    elif request.method == "POST":
        print(request.GET.get('user', ''))

        return render(request, 'home.html')
```

# CBV视图

# 理解模板

# 模型与数据库

# 表单与模型

# Admin后台系统

admin 后台系统，是一个用于对网站数据库和文件进行快速操作和管理的系统，使网页内容能够及时得到更新和调整。

创建 app，注册 app，声明模型，迁移数据库，创建超级管理员帐号

使用 admin 系统，需要在 app 的目录下找到 amind.py 注册,方法用二种：

- 将模型直接注册到 Admin 后台

  ```python
  ```

  

```python
```

# Auth认证系统

# 优化网站

## 会话控制

## 缓存机制

## 消息框架

## 分页功能

## 国际化和本地化

## 单元测试

## 中间件

## 异步编程

## 信号机制



# 功能扩展





