export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Three.js 练习首页</h1>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
          <span className="text-muted-foreground">示例 01 预览</span>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
          <span className="text-muted-foreground">示例 02 预览</span>
        </div>
        <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
          <span className="text-muted-foreground">更多示例...</span>
        </div>
      </div>
      <div className="min-h-[300px] flex-1 rounded-xl bg-muted/50 p-4">
        <p className="text-muted-foreground">欢迎使用 Three.js 练习项目！</p>
        <p className="text-muted-foreground mt-2">点击左侧菜单查看不同示例。</p>
      </div>
    </div>
  )
}
