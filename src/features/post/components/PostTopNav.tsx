import { ChangeEvent, FC, useRef } from 'react';
import { TPost } from '../types/post';
import { TUser } from '../../user/types/user';
import {
  Box,
  Center,
  HStack,
  Spacer,
  Text,
  Input,
  Button
} from '@chakra-ui/react';
import UserAvatar from '../../user/avatar/components/UserAvatar';
import TbStar from '../../../shared/components/icons/tabler/TbStar';
import TbBookDownload from '../../../shared/components/icons/tabler/TbBookDownload';
import TbBookUpload from '../../../shared/components/icons/tabler/TbBookUpload';
import TbPhoto from '../../../shared/components/icons/tabler/TbPhoto';
import { useAuthenticationContext } from '@atsnek/jaen';

interface IPostTopNavProps {
  post?: TPost;
  author: TUser | null;
  handleTogglePrivacy: () => void;
  isUpdatingPrivacy?: boolean;
  setPostPreviewImage: (src: File) => void;
  isAuthor?: boolean;
  canEdit?: boolean;
  handleRatePost: () => void;
  isRating?: boolean;
}

/**
 * Top navigation for reading/editing a post.
 */
const PostTopNav: FC<IPostTopNavProps> = ({
  post,
  author,
  handleTogglePrivacy,
  isUpdatingPrivacy,
  setPostPreviewImage,
  isAuthor,
  canEdit,
  handleRatePost,
  isRating
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const isAuthenticated = useAuthenticationContext().user !== null;

  const handleImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget?.files || e.currentTarget.files?.length === 0) return;
    const file = e.currentTarget.files[0];
    setPostPreviewImage(file);
  };

  const isPublic = post?.privacy === 'public';

  return (
    <Box
      w="full"
      borderBottom="1px solid"
      borderBottomColor="topNav.borderColor"
      bgColor="shared.translucent.bgColor"
      py={3}
      mb={5}
      display={{ base: 'none', md: 'block' }}
    >
      <Center>
        <HStack w="full" maxW="7xl">
          {author && (
            <>
              {
                <UserAvatar
                  user={author}
                  boxSize="30px"
                  redirectToProfile
                  scaleOnHover
                />
              }
              <Text fontWeight="medium">{author.displayName}</Text>
            </>
          )}
          <Spacer />
          <HStack spacing={3}>
            {!canEdit && (
              <Button
                variant={isAuthor || !isAuthenticated ? 'invisible' : 'solid'}
                colorScheme="gray"
                size="sm"
                leftIcon={
                  <TbStar
                    fill={
                      post?.hasRated
                        ? 'features.rating.rated.color'
                        : 'transparent'
                    }
                    stroke={
                      post?.hasRated
                        ? 'features.rating.rated.color'
                        : 'currentColor'
                    }
                  />
                }
                onClick={handleRatePost}
                isDisabled={isRating}
              >
                {post?.stars || 0}
              </Button>
            )}
            <Input
              ref={imageInputRef}
              type="file"
              display="none"
              visibility="hidden"
              zIndex={-9999}
              accept="image/*"
              onChange={handleImageInputChange}
            />
            {canEdit && (
              <>
                <Button
                  colorScheme="gray"
                  size="sm"
                  leftIcon={<TbPhoto />}
                  onClick={() => imageInputRef.current?.click()}
                >
                  Image
                </Button>
                <Button
                  colorScheme="gray"
                  size="sm"
                  leftIcon={isPublic ? <TbBookDownload /> : <TbBookUpload />}
                  onClick={handleTogglePrivacy}
                  isDisabled={isUpdatingPrivacy}
                >
                  {isPublic ? 'Unpublish' : 'Publish'}
                </Button>
              </>
            )}
          </HStack>
        </HStack>
      </Center>
    </Box>
  );
};

export default PostTopNav;
function setPostPreviewImage(file: File) {
  throw new Error('Function not implemented.');
}
