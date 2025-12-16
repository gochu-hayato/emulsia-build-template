import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  QueryConstraint
} from 'firebase/firestore';
import { db } from '@/config/firebase';

// コレクション名の型定義
export type CollectionName = 'blogs' | 'products' | 'users' | 'meetings';

/**
 * 全件取得
 * @param collectionName コレクション名
 * @param constraints 追加のクエリ制約（オプション）
 * @returns ドキュメントの配列
 */
export async function getAll<T>(
  collectionName: CollectionName,
  ...constraints: QueryConstraint[]
): Promise<T[]> {
  const defaultConstraints = [orderBy('createdAt', 'desc')];
  const q = query(
    collection(db, collectionName),
    ...defaultConstraints,
    ...constraints
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as T[];
}

/**
 * 1件取得
 * @param collectionName コレクション名
 * @param id ドキュメントID
 * @returns ドキュメント（存在しない場合はnull）
 */
export async function getOne<T>(
  collectionName: CollectionName,
  id: string
): Promise<T | null> {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as T;
  }
  return null;
}

/**
 * 新規作成
 * @param collectionName コレクション名
 * @param data 作成するデータ
 * @returns 作成されたドキュメントのID
 */
export async function create<T>(
  collectionName: CollectionName,
  data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

/**
 * 更新
 * @param collectionName コレクション名
 * @param id ドキュメントID
 * @param data 更新するデータ
 */
export async function update<T>(
  collectionName: CollectionName,
  id: string,
  data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

/**
 * 削除
 * @param collectionName コレクション名
 * @param id ドキュメントID
 */
export async function remove(
  collectionName: CollectionName,
  id: string
): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}
