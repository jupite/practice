import * as THREE from "three";
// 参考 http://www.webgl3d.cn/pages/2e5d69/
/**
 *
 * 创建3D场景对象Scene
 */
function createScene() {
  // 三维场景
  const scene = new THREE.Scene();
  // 物体形状：几何体Geometry
  // 创建一个长方体几何对象Geometry
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  // 物体外观：材质Material
  // 创建一个材质对象Material
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000, //0xff0000设置材质颜色为红色
  });
  // 物体：网格模型Mesh
  const mesh = new THREE.Mesh(geometry, material);
  // 模型位置.position
  // 设置网格模型在三维空间中的位置坐标，默认是坐标原点
  mesh.position.set(0, 10, 0);
  // 将网格模型添加到场景中，通过.add()方法，把网格模型mesh添加到三维场景
  scene.add(mesh);

  return { scene, mesh };
}

/**
 * 创建相机对象Camera
 */
function createCamera() {
  // 实例化一个透视投影相机对象
  const camera = new THREE.PerspectiveCamera();
  // 相机位置.position
  // 相机在Three.js三维坐标系中的位置
  // 根据需要设置相机位置具体值
  camera.position.set(200, 200, 200);
  // 相机观察目标.lookAt()
  //相机观察目标指向Threejs 3D空间中某个位置
  camera.lookAt(0, 0, 0); //坐标原点
  return camera;
}

/**
 * 创建渲染器Renderer
 */
function createRenderer(scene: THREE.Scene, camera: THREE.Camera) {
  // 创建渲染器对象
  const renderer = new THREE.WebGLRenderer();
  // 设置Canvas画布尺寸.setSize()
  // 定义threejs输出画布的尺寸(单位:像素px)
  const width = 800; //宽度
  const height = 500; //高度
  renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
  // 渲染器渲染方法.render()
  renderer.render(scene, camera); //执行渲染操作
  // 渲染器Canvas画布属性.domElement
  // 渲染到id为webgl的div中
  // document.getElementById('webgl')?.appendChild(renderer.domElement);
  return renderer;
}

export function initThree() {
  // 场景Scene、相机Camera、渲染器Renderer 三个基本概念
  // 创建3D场景对象Scene
  const { scene } = createScene();
  // 实例化一个透视投影相机对象
  const camera = createCamera();
  // 创建渲染器对象
  const renderer = createRenderer(scene, camera);   
  
  return { scene, camera, renderer };
}
