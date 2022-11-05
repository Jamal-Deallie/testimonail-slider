import {
  useState,
  useCallback,
  useRef,
  useEffect,
  ReactNode,
} from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import cn from 'classnames';
import gsap from 'gsap';
import { testimonials } from 'data/data';

interface Props {
  isActive1?: boolean;
  isActive2?: boolean;
  isActive3?: boolean;
  el: HTMLUListElement;
}

export default function Home({ isActive1, isActive2, isActive3, el }: Props) {
  let imageList = useRef<HTMLUListElement>(null);
  let testimonialList = useRef<HTMLUListElement>(null);
  const imageWidth = 340;

  const [state, setState] = useState({
    isActive1: true,
    isActive2: false,
    isActive3: false,
  });

  const content = (): ReactNode => {
    return (
      <ul ref={testimonialList}>
        <li className={cn(state.isActive1 ? 'active' : '', styles.cont)}>
          <div className={styles['content-inner']}>
            <p className={styles.quote}>{testimonials[0]?.quote}</p>
            <h3 className={styles.name}>{testimonials[0]?.name}</h3>
            <h4 className={styles.title}>{testimonials[0]?.title}</h4>
          </div>
        </li>
        <li className={cn(state.isActive2 ? 'active' : '', styles.cont)}>
          <div className={styles['content-inner']}>
            <p className={styles.quote}>{testimonials[1]?.quote}</p>
            <h3 className={styles.name}>{testimonials[1]?.name}</h3>
            <h4 className={styles.title}>{testimonials[1]?.title}</h4>
          </div>
        </li>
        <li className={cn(state.isActive3 ? 'active' : '', styles.cont)}>
          <div className={styles['content-inner']}>
            <p className={styles.quote}>{testimonials[2]?.quote}</p>
            <h3 className={styles.name}>{testimonials[2]?.name}</h3>
            <h4 className={styles.title}>{testimonials[2]?.title}</h4>
          </div>
        </li>
      </ul>
    );
  };

  const listExists = (): boolean | null => {
    return (
      (imageList.current &&
        imageList.current.children &&
        imageList.current.children.length > 0) ||
      (testimonialList.current &&
        testimonialList.current.children &&
        testimonialList.current.children.length > 0)
    );
  };

  const elementList = useCallback((): HTMLElement[] | undefined => {
    if (listExists()) {
      return Array.prototype.slice.call(imageList.current?.children);
    }
  }, []);

  const collectionList = useCallback((): HTMLElement[] | undefined => {
    if (listExists()) {
      return Array.prototype.slice.call(testimonialList.current?.children);
    }
  }, []);

  console.log(collectionList());

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(collectionList()![0], { opacity: 0 }, { opacity: 1 });
    });

    return () => ctx.revert();
  }, []);

  const slideLeft = (index: number, duration: number, multiplied = 1) => {
    gsap.to(elementList()![index], {
      duration: duration,
      x: -imageWidth * multiplied,
      ease: 'Power3.easeOut',
    });
  };

  const slideRight = (index: number, duration: number, multiplied = 1) => {
    console.log('slide-right');
    gsap.to(elementList()![index], {
      duration: duration,
      x: imageWidth * multiplied,
      ease: 'Power3.easeOut',
    });
    console.log(imageWidth * multiplied);
  };

  const scale = (index: number, duration: number) => {
    gsap.from(elementList()![index], {
      duration: duration,
      scale: 1.2,
      ease: 'Power3.easeOut',
    });
  };

  const fadeOut = (index: number, duration: number) => {
    gsap.to(collectionList()![index], {
      duration: duration,
      opacity: 0,
    });
  };

  const fadeIn = (index: number, duration: number) => {
    gsap.to(collectionList()![index], {
      duration: duration,
      opacity: 1,
      delay: 1,
    });
  };

  const prevSlide = () => {
    if (elementList()?.[0]?.classList.contains('active')) {
      setState({ isActive1: false, isActive2: false, isActive3: true });
      //Image transition
      slideLeft(2, 0, 3);
      slideLeft(2, 1, 2);
      scale(2, 1);
      slideRight(0, 1);
      slideRight(1, 1);
      //content transition
      fadeOut(0, 1);
      fadeIn(2, 1);
    } else if (elementList()?.[1]?.classList.contains('active')) {
      console.log('slide-right');
      setState({ isActive2: false, isActive1: true, isActive3: false });
      //Image transition
      slideLeft(0, 0);
      slideRight(0, 1, 0);
      slideRight(1, 1, 0);
      slideRight(2, 1, 2);
      scale(0, 1);
      //content transition
      fadeOut(1, 1);
      fadeIn(0, 1);
    } else if (elementList()?.[2]?.classList.contains('active')) {
      setState({ isActive1: false, isActive2: true, isActive3: false });
      //Image transition
      slideLeft(2, 1);
      slideLeft(1, 0, 2);
      slideLeft(1, 1);
      scale(1, 1);
      //content transition
      fadeOut(2, 1);
      fadeIn(1, 1);
    }
  };

  const nextSlide = () => {
    if (elementList()?.[0]?.classList.contains('active')) {
      setState({ isActive1: false, isActive2: true, isActive3: false });
      //Image transition
      slideLeft(0, 1);
      slideLeft(1, 1);
      scale(1, 1);
      slideLeft(2, 1);
      slideLeft(2, 0);
      fadeOut(0, 1);
      fadeIn(1, 1);
    } else if (elementList()?.[1]?.classList.contains('active')) {
      console.log('slide-right');
      setState({ isActive2: false, isActive3: true, isActive1: false });
      //Image transition
      slideRight(0, 1);
      slideLeft(1, 1, 2);
      slideLeft(2, 1, 2);
      scale(2, 1);
      //content transition
      fadeOut(1, 1);
      fadeIn(2, 1);
    } else if (elementList()?.[2]?.classList.contains('active')) {
      setState({ isActive1: true, isActive3: false, isActive2: false });
      //Image transition
      slideLeft(2, 1, 3);
      slideLeft(0, 1, 0);
      slideLeft(1, 0, 0);
      scale(0, 1);
      //content transition
      fadeOut(2, 1);
      fadeIn(0, 1);
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div onClick={prevSlide} className={styles.arrows}>
          &#8592;
        </div>
        <div className={styles.inner}>
          <div className={styles['t-image']}>
            <ul ref={imageList}>
              <li className={cn(state.isActive1 ? 'active' : '', 'test')}>
                <Image
                  src={testimonials[0].image}
                  alt={testimonials[0].name}
                  width={imageWidth}
                  height={510}
                />
              </li>
              <li className={cn(state.isActive2 ? 'active' : '', 'test')}>
                <Image
                  src={testimonials[1].image}
                  alt={testimonials[1].name}
                  width={imageWidth}
                  height={510}
                />
              </li>
              <li className={cn(state.isActive3 ? 'active' : '', 'test')}>
                <Image
                  src={testimonials[2].image}
                  alt={testimonials[2].name}
                  width={imageWidth}
                  height={510}
                />
              </li>
            </ul>
          </div>
          <div className={styles['t-content']}>{content()}</div>
        </div>
        <div className={cn(styles.arrows, styles.right)} onClick={nextSlide}>
          &#8594;
        </div>
      </div>
    </div>
  );
}
