PGDMP      ,                }            task_management    17.2    17.2 -    V           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            W           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            X           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            Y           1262    16547    task_management    DATABASE     �   CREATE DATABASE task_management WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE task_management;
                     postgres    false            �            1259    16580    List    TABLE     p   CREATE TABLE public."List" (
    id integer NOT NULL,
    name text NOT NULL,
    "spaceId" integer NOT NULL
);
    DROP TABLE public."List";
       public         heap r       postgres    false            �            1259    16579    List_id_seq    SEQUENCE     �   CREATE SEQUENCE public."List_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."List_id_seq";
       public               postgres    false    223            Z           0    0    List_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."List_id_seq" OWNED BY public."List".id;
          public               postgres    false    222            �            1259    16571    Space    TABLE     Q   CREATE TABLE public."Space" (
    id integer NOT NULL,
    name text NOT NULL
);
    DROP TABLE public."Space";
       public         heap r       postgres    false            �            1259    16570    Space_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Space_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Space_id_seq";
       public               postgres    false    221            [           0    0    Space_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Space_id_seq" OWNED BY public."Space".id;
          public               postgres    false    220            �            1259    16589    Task    TABLE     N  CREATE TABLE public."Task" (
    id integer NOT NULL,
    name text NOT NULL,
    "dueDate" timestamp(3) without time zone NOT NULL,
    cat text NOT NULL,
    speciality text NOT NULL,
    city text NOT NULL,
    tel text NOT NULL,
    cnp text NOT NULL,
    workplace text NOT NULL,
    email text NOT NULL,
    dob timestamp(3) without time zone NOT NULL,
    cuim text NOT NULL,
    address text NOT NULL,
    schedule text NOT NULL,
    "listId" integer NOT NULL,
    vizita1 boolean DEFAULT false NOT NULL,
    vizita2 boolean DEFAULT false NOT NULL,
    "userId" integer NOT NULL
);
    DROP TABLE public."Task";
       public         heap r       postgres    false            �            1259    16588    Task_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Task_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Task_id_seq";
       public               postgres    false    225            \           0    0    Task_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Task_id_seq" OWNED BY public."Task".id;
          public               postgres    false    224            �            1259    16562    User    TABLE     �   CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "fullName" text NOT NULL,
    role text DEFAULT 'user'::text NOT NULL
);
    DROP TABLE public."User";
       public         heap r       postgres    false            �            1259    16561    User_id_seq    SEQUENCE     �   CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."User_id_seq";
       public               postgres    false    219            ]           0    0    User_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;
          public               postgres    false    218            �            1259    16597    _UserSpaces    TABLE     Z   CREATE TABLE public."_UserSpaces" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);
 !   DROP TABLE public."_UserSpaces";
       public         heap r       postgres    false            �            1259    16550    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap r       postgres    false            �           2604    16583    List id    DEFAULT     f   ALTER TABLE ONLY public."List" ALTER COLUMN id SET DEFAULT nextval('public."List_id_seq"'::regclass);
 8   ALTER TABLE public."List" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    223    223            �           2604    16574    Space id    DEFAULT     h   ALTER TABLE ONLY public."Space" ALTER COLUMN id SET DEFAULT nextval('public."Space_id_seq"'::regclass);
 9   ALTER TABLE public."Space" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    221    221            �           2604    16592    Task id    DEFAULT     f   ALTER TABLE ONLY public."Task" ALTER COLUMN id SET DEFAULT nextval('public."Task_id_seq"'::regclass);
 8   ALTER TABLE public."Task" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    224    225    225            �           2604    16565    User id    DEFAULT     f   ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);
 8   ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    218    219            P          0    16580    List 
   TABLE DATA           5   COPY public."List" (id, name, "spaceId") FROM stdin;
    public               postgres    false    223   �4       N          0    16571    Space 
   TABLE DATA           +   COPY public."Space" (id, name) FROM stdin;
    public               postgres    false    221   �4       R          0    16589    Task 
   TABLE DATA           �   COPY public."Task" (id, name, "dueDate", cat, speciality, city, tel, cnp, workplace, email, dob, cuim, address, schedule, "listId", vizita1, vizita2, "userId") FROM stdin;
    public               postgres    false    225   5       L          0    16562    User 
   TABLE DATA           G   COPY public."User" (id, email, password, "fullName", role) FROM stdin;
    public               postgres    false    219   6       S          0    16597    _UserSpaces 
   TABLE DATA           1   COPY public."_UserSpaces" ("A", "B") FROM stdin;
    public               postgres    false    226   �6       J          0    16550    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public               postgres    false    217   7       ^           0    0    List_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."List_id_seq"', 1, true);
          public               postgres    false    222            _           0    0    Space_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Space_id_seq"', 1, true);
          public               postgres    false    220            `           0    0    Task_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."Task_id_seq"', 2, true);
          public               postgres    false    224            a           0    0    User_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."User_id_seq"', 3, true);
          public               postgres    false    218            �           2606    16587    List List_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."List"
    ADD CONSTRAINT "List_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."List" DROP CONSTRAINT "List_pkey";
       public                 postgres    false    223            �           2606    16578    Space Space_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Space"
    ADD CONSTRAINT "Space_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Space" DROP CONSTRAINT "Space_pkey";
       public                 postgres    false    221            �           2606    16596    Task Task_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Task" DROP CONSTRAINT "Task_pkey";
       public                 postgres    false    225            �           2606    16569    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public                 postgres    false    219            �           2606    16601    _UserSpaces _UserSpaces_AB_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public."_UserSpaces"
    ADD CONSTRAINT "_UserSpaces_AB_pkey" PRIMARY KEY ("A", "B");
 M   ALTER TABLE ONLY public."_UserSpaces" DROP CONSTRAINT "_UserSpaces_AB_pkey";
       public                 postgres    false    226    226            �           2606    16558 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public                 postgres    false    217            �           1259    16602    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public                 postgres    false    219            �           1259    16603    _UserSpaces_B_index    INDEX     N   CREATE INDEX "_UserSpaces_B_index" ON public."_UserSpaces" USING btree ("B");
 )   DROP INDEX public."_UserSpaces_B_index";
       public                 postgres    false    226            �           2606    16604    List List_spaceId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."List"
    ADD CONSTRAINT "List_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES public."Space"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 D   ALTER TABLE ONLY public."List" DROP CONSTRAINT "List_spaceId_fkey";
       public               postgres    false    221    223    4780            �           2606    16609    Task Task_listId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_listId_fkey" FOREIGN KEY ("listId") REFERENCES public."List"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 C   ALTER TABLE ONLY public."Task" DROP CONSTRAINT "Task_listId_fkey";
       public               postgres    false    225    223    4782            �           2606    26966    Task Task_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 C   ALTER TABLE ONLY public."Task" DROP CONSTRAINT "Task_userId_fkey";
       public               postgres    false    219    225    4778            �           2606    16614    _UserSpaces _UserSpaces_A_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_UserSpaces"
    ADD CONSTRAINT "_UserSpaces_A_fkey" FOREIGN KEY ("A") REFERENCES public."Space"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public."_UserSpaces" DROP CONSTRAINT "_UserSpaces_A_fkey";
       public               postgres    false    4780    226    221            �           2606    16619    _UserSpaces _UserSpaces_B_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_UserSpaces"
    ADD CONSTRAINT "_UserSpaces_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public."_UserSpaces" DROP CONSTRAINT "_UserSpaces_B_fkey";
       public               postgres    false    219    226    4778            P   !   x�3�t�K)JMMTp�H-*I-�4����� b��      N      x�3��K--������ ��      R   �   x�U�AN�0EדS̾r4�6m̪-�@B�haՍ	X$u�8w�Bǩ�*��?����w�
����$�B�R0!�M*����k܇5��}���G�bE)Y.W��kS*�
���6����u^�X�$��J�w�!��M�52<g�_��x�T����:� @�Is����,�g�ı�O�G5�]S?׵���۷�]�o�Z)Ak��}y]�bD7&��o�ˉ�N��<˲?�\P      L   �   x�u�M��0��ɯ�'��]ě1,���\�K4c���ڤ���H�"x�y�y��F ����XCU�h��4��z�(	I<y��y�[0� 7v��>~��}�`d���N���%l^���\m?Y׬,oUa��:��J�[~�eN��N>6̐���yS14�8L�f�,�i:�H�	�,|����ę���Cŷ�9��ч�{�6��O�1�$�Z�      S      x������ � �      J     x�u�Mj\1���Sd4���s���0��16ؓ,r��v0�q@�%�R�<�\�[�"���/-��d�)z�?�{�t��$U��DZ��#V��{x&��1x�����|�vR:1+!z9ASb>_�/������Κ�ٳo�Y�諬e�=d��{;X�$O�f
�[��^-�{��0#�{WM�.^}m��D0$bě�o�'��Ѷcy����s�_�\�q^���O�P>\"��^Qvz�sx�\D�Je�k��ey U��2Z�FHn\�y�n( *�Pcg���Q�h~p�ρj=bۇ�I������z�����]~A�f����a�\��I�/ɠ�N��az�q�T�3zUd�Y1F*W�����j�H�R�ܭ�l;��C�࢞�NP�Į�0��wy������p����/��.#W�W�Ё�1
؄"���J5�!J��1��0���s�gA*x,�F���k������H*��C�_!�#˧f���ηF���t�onn�O��     