import { useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { fetchClass, fetchUserProfile } from "../actions";

const useIsClassTeacher = config => {
  const { classId } = useParams();
  const dispatch = useDispatch();
  const { user, auth, classData } = useSelector(state => ({
    user: state.user,
    auth: state.auth,
    classData: state.classes[classId]
  }));
  // console.log(user, auth, classData);

  useEffect(() => {
    dispatch(fetchClass(classId));
  }, [dispatch, classId]);

  useEffect(() => {
    if (user.username && classData && classData.teacher && user.username !== classData.teacher) {
      if (config.redirect) dispatch(push("/class/"));
    }
  }, [classData, user.username, dispatch, config.redirect]);

  useEffect(() => {
    if (!auth.isSignedIn) dispatch(push("/login/"));
    else dispatch(fetchUserProfile());
  }, [auth.isSignedIn, dispatch]);

  const value =
    user.username && classData && classData.teacher && user.username === classData.teacher;
  if (value === true || value === false) return value;
  else return null;
};

export default useIsClassTeacher;
