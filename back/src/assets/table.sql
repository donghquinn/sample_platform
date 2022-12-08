create table `client` (
  `id`                 INT(11)       UNSIGNED  NOT NULL                     AUTO_INCREMENT,
  `name`               VARCHAR(256)            NOT NULL                     COMMENT '이름',
  `type`               VARCHAR(10)             NULL                         COMMENT '입맛 유형',
  `emotion`            VARCHAR(512)            NULL                         COMMENT '입맛 외 요소 값',
  `key`                VARCHAR(10)             NULL                         COMMENT '유저 별 헤더 인증 키',
  `memo`               VARCHAR(512)            NULL                         COMMENT '메모',
  `created`            DATETIME                DEFAULT CURRENT_TIMESTAMP    COMMENT '생성 타임스탬프',
  `updated`            DATETIME                DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 타임스탬프',
  PRIMARY KEY (`id`, 'type')
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

create table `mvp_value` (
  `id`                 INT(11)        UNSIGNED  NOT NULL                    AUTO_INCREMENT,
  `young`              INT(35)                  NOT NULL DEFAULT 0          COMMENT 'y 수치 값',
  `old`                INT(35)                  NOT NULL DEFAULT 0          COMMENT 'o 수치 값',
  `spicy      `        INT(35)                  NOT NULL DEFAULT 0          COMMENT 't 하위, 향신료 수치 값',
  `hot`                INT(35)                  NOT NULL DEFAULT 0          COMMENT 't 하위, 매운 수치 값',
  `sweet`              INT(35)                  NOT NULL DEFAULT 0          COMMENT 't 하위, 짠 수치 값',
  `salty`              INT(35)                  NOT NULL DEFAULT 0          COMMENT 't 하위, 단 수치 값',
  `unspicy`            INT(35)                  NOT NULL DEFAULT 0          COMMENT 'm 하위, 향신료 아닌 수치 값',
  `unhot`              INT(35)                  NOT NULL DEFAULT 0          COMMENT 'm 하위, 맵지 않은 수치 값',
  `unsweet`            INT(35)                  NOT NULL DEFAULT 0          COMMENT 'm 하위, 달지 않은 수치 값',
  `unsalty`            INT(35)                  NOT NULL DEFAULT 0          COMMENT 'm 하위, 짜지 않은 수치 값',
  `heavy`              INT(35)                  NOT NULL DEFAULT 0          COMMENT 'h 수치 값',
  `light`              INT(35)                  NOT NULL DEFAULT 0          COMMENT 'l 수치 값',
  `sea`                INT(35)                  NOT NULL DEFAULT 0          COMMENT 's 수치 값',
  `earth`              INT(35)                  NOT NULL DEFAULT 0          COMMENT 'e 수치 값',
  `created`            DATETIME                DEFAULT CURRENT_TIMESTAMP    COMMENT '생성 타임스탬프',
  `updated`            DATETIME                DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 타임스탬프',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

create table `mvp_percentage` (
  `id`                INT(11)          UNSIGNED  NOT NULL                    AUTO_INCREMENT,
  `ypercen`            INT(11)                    NOT NULL DEFAULT 100        COMMENT 'Y 타입 퍼센테이지',
  `opercen`            INT(11)                    NOT NULL DEFAULT 0          COMMENT 'O 타입 퍼센테이지',
  `tpercen`            INT(11)                    NOT NULL DEFAULT 100        COMMENT 'T 타입 퍼센테이지',
  `mpercen`            INT(11)                    NOT NULL DEFAULT 0          COMMENT 'M 타입 퍼센테이지',
  `hpercen`            INT(11)                    NOT NULL DEFAULT 100        COMMENT 'H 타입 퍼센테이지',
  `lpercen`            INT(11)                    NOT NULL DEFAULT 0          COMMENT 'L 타입 퍼센테이지',
  `spercen`            INT(11)                    NOT NULL DEFAULT 100        COMMENT 'S 타입 퍼센테이지',
  `epercen`            INT(11)                    NOT NULL DEFAULT 0          COMMENT 'E 타입 퍼센테이지',
  `created`            DATETIME                DEFAULT CURRENT_TIMESTAMP      COMMENT '생성 타임스탬프',
  `updated`            DATETIME                DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정 타임스탬프',
  PRIMARY KEY (`uid`, 'type')
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

create table `emotionfood` (
  `foodname`       VARCHAR(512)          NOT NULL       COMMNET '음식 이름',
  `type`           VARCHAR(256)          NOT NULL       COMMENT '감정 타입',
  `frequency`      INT(11)               NOT NULL       COMMENT '빈도 수',
  PRIMARY KEY (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

create table `normalfood` (
  `foodname`       VARCHAR(512)          NOT NULL       COMMNET '음식 이름',
  `type`           VARCHAR(256)          NOT NULL       COMMENT '입맛 타입',
  `frequency`      INT(11)               NOT NULL       COMMENT '빈도 수',
  PRIMARY KEY (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;