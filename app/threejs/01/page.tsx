"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Page() {
  // 使用 ref 获取 canvas 元素
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 使用 ref 存储动画帧 ID，用于清理
  const animationRef = useRef<number>(0);
  // 使用 ref 存储 renderer，用于清理
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    // 确保 canvas 已挂载
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    // ========== 1. 场景(Scene) - 所有3D对象的容器 ==========
    const scene = new THREE.Scene();
    // 设置背景色为深灰色
    scene.background = new THREE.Color(0x1a1a1a);

    // ========== 2. 相机(Camera) - 观察场景的视角 ==========
    // PerspectiveCamera: 透视相机，模拟人眼视角
    // 参数: 视野角度(75度), 宽高比, 近裁剪面(0.1), 远裁剪面(1000)
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000,
    );
    // 设置相机位置 (x, y, z)
    camera.position.set(0, 0, 3);
    // 相机看向原点
    camera.lookAt(0, 0, 0);

    // ========== 3. 渲染器(Renderer) - 将3D场景渲染到canvas ==========
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true, // 开启抗锯齿，让边缘更平滑
    });
    rendererRef.current = renderer;

    // 设置渲染器尺寸为 canvas 的实际显示尺寸
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    // 设置像素比，适配高清屏(Retina)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ========== 4. 几何体(Geometry) - 定义物体的形状 ==========
    // BoxGeometry: 立方体
    // 参数: 宽度, 高度, 深度
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // ========== 5. 材质(Material) - 定义物体的外观 ==========
    // MeshStandardMaterial: 标准物理材质，支持光照
    const material = new THREE.MeshStandardMaterial({
      color: 0x03c03c, // 基础颜色 (绿色)
      roughness: 0.3, // 粗糙度 (0-1，越小越光滑)
      metalness: 0.2, // 金属度 (0-1，越大越像金属)
    });

    // ========== 6. 网格(Mesh) = 几何体 + 材质 ==========
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // ========== 7. 灯光(Lighting) - 照亮场景 ==========
    // 环境光 - 均匀照亮所有物体，没有阴影
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // 方向光 - 模拟太阳光，产生阴影
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // ========== 8. 动画循环(Animation Loop) ==========
    const animate = () => {
      // 请求下一帧动画
      animationRef.current = requestAnimationFrame(animate);

      // 旋转立方体
      cube.rotation.y += 0.01; // 绕 Y 轴旋转
      cube.rotation.x += 0.005; // 绕 X 轴旋转

      // 渲染场景
      renderer.render(scene, camera);
    };

    // 启动动画
    animate();

    // ========== 9. 响应式处理 - 窗口大小改变时调整 ==========
    const handleResize = () => {
      if (!canvas.parentElement) return;

      // 获取父元素尺寸
      const { clientWidth, clientHeight } = canvas.parentElement;

      // 更新相机宽高比
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();

      // 更新渲染器尺寸
      renderer.setSize(clientWidth, clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // ========== 10. 清理函数 - 组件卸载时释放资源 ==========
    return () => {
      // 取消动画帧
      cancelAnimationFrame(animationRef.current);
      // 移除事件监听
      window.removeEventListener("resize", handleResize);
      // 释放几何体内存
      geometry.dispose();
      // 释放材质内存
      material.dispose();
      // 销毁渲染器
      renderer.dispose();
    };
  }, []); // 空依赖数组，只在组件挂载时执行

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">示例 01 - 旋转立方体</h1>
      <div className="flex">
        <div className="text-sm text-muted-foreground">
          <p>Three.js 基础概念：</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>Scene(场景)</strong> - 所有3D对象的容器
            </li>
            <li>
              <strong>Camera(相机)</strong> - 观察视角，类似人眼
            </li>
            <li>
              <strong>Renderer(渲染器)</strong> - 将3D渲染到屏幕
            </li>
            <li>
              <strong>Geometry(几何体)</strong> - 物体的形状
            </li>
            <li>
              <strong>Material(材质)</strong> - 物体的外观
            </li>
            <li>
              <strong>Mesh(网格)</strong> - 几何体 + 材质
            </li>
            <li>
              <strong>Light(灯光)</strong> - 照亮场景
            </li>
          </ul>
        </div>
        <div className="relative w-full h-[500px] rounded-xl overflow-hidden bg-[#1a1a1a]">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
      </div>
    </div>
  );
}
