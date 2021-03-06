
export default {
  /**
   * 要发布到网站的路径，例如 https://xxx.github.com/docs/ 默认 / ,注意必须 / 结尾
   * */
  base: '/vc-ui/',
  /**
   * 限制那个资源目录下的规定文件会被生成文档
   */
  src: './',
  /**
   * 规定哪些文件会被当做文档文件，string | string[]
   */
  files: '**/*.{md,markdown,mdx}',
  /**
   * 排除哪些文件
   */
  ignore: ['README.md', 'CHANGELOG.md'],
  /**
   * docz build 之后生成的静态文件到哪个目录
   */
  // dest: '/build',
  /**
   * 网站的标题，默认是 package.json name
   */
  title: 'VC UI',
  /**
   * 网站的描述，会生成 mate 标签，默认是 package.json description
   */
  description: 'VC UI Components',
  /**
   * Typescript 项目开启，同时需要创建 tsconfig.json 文件
   */
  typescript: false,
  /**
   * 用来配置静态文件绝对路径，例如 ![placeholder image](/public/some-image.png)
   * NOTICE：亲测，无效，还是得用相对路径
   */
  // public: '/public',
  /**
   * 默认的 Docz 文档中提供编辑跳转到 github 的功能，这个用来配置调转过去的分支名
   */
  editBranch: 'main',
  /**
   * docz dev 环境的端口号配置，同样可配置 host
   */
  port: 3002,
  /**
   * 侧边导航的排序 可以是文档 name 的数组，也可以是一个配置对象如下,
   * 虽然可以在这里排序，但是如果每开发一个组件，还有到这里做一下排序，是比较麻烦的
   * 这个可以通过 自定义文档配置 + 自定义主题实现
  */
  // menu: [
  //   { name: 'Components', menu: ['Button', 'Select'] }
  // ],
}